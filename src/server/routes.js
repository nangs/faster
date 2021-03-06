import { Token, User, Round } from './models';
import { sendResetPasswordEmail, sendVerificationEmail } from './mailer';

const getUserSession = req => (
    req.session
    && req.session.passport
    && req.session.passport.user
) ? req.session.passport.user : null;

export default (req, res) => {
    const user = getUserSession(req);

    const initialState = {
        atom: {
            user: user,
            auth: !!user
        }
    };

    const markup = `<!doctype html>
        <html>
          <head>
            <title>Faster</title>
            <link rel="icon" type="image/png" href="profile.png" />
            <link rel="stylesheet" type="text/css" href="styles.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
            <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
            <script src="https://code.highcharts.com/highcharts.js"></script>
            <script src="https://code.highcharts.com/highcharts-more.js"></script>
            <script src="https://code.highcharts.com/modules/solid-gauge.js"></script>
            <script src="https://code.highcharts.com/modules/exporting.js"></script>
          </head>
          <body>
            <div id="app"></div>
            <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
            </script>
            <script src="/build/bundle.js"></script>
          </body>
        </html>
    `;

    res.status(200).send(markup);
}

const forgotPassword = (req, res) => {

    const handleReset = (user) => {
        Token.new(user._id, 'RESET', (tokenErr, token) => {
            if(tokenErr) {
                res.status(500).send();
            } else {
                sendResetPasswordEmail(email, token.token, () => {
                    res.status(200).send({ sent: true });
                });
            }
        });
    };

    const email = req.body.email;
    User.findOne({ 'local.email': email }, (err, user) => {
        if(err) {
            res.status(500).send();
        } else if(user === null) {
            res.status(500).send({ invalidEmail: true });
        } else {
            handleReset(user);
        }
    });
};

const resendVerificationEmail = (req, res) => {
    const userId = req.body.userId;
    console.log('body', userId);

    User.findById(userId).then(user => {
        console.log('found user', user);
        Token.new(userId, 'USER')
            .then(token => {
                console.log('crated token', token);
                sendVerificationEmail(user.local.email, token.token)
                    .then(() => res.status(200).send())
                    .catch(emailError => res.status(500).send(emailError));
            })
            .catch(tokenError => res.status(500).send(tokenError));
    });
};

const resetPassword = (req, res) => {
    const { password, confirmPassword } = req.body;

    if(password !== confirmPassword) {
        return res.status(500).send();
    }

    const handleFoundUser = (user) => {
        user.local.password = user.generateHash(password);
        user.save((saveErr, updatedUser) => {
            if(saveErr || updatedUser === null) {
                return res.status(500).send();
            }
            return res.status(200).send();
        });
    };

    const handleFoundToken = (token) => {
        User.findById(token.userId, (userErr, user) => {
            if(userErr || user === null) {
                return res.status(500).send();
            }
            handleFoundUser(user);
        });
    };

    const user = getUserSession(req);
    const loggedInUserWantsToChangePassword = !!user;

    if(loggedInUserWantsToChangePassword) {
        User.findById(user.id, (userErr, user) => {
            if(userErr || user === null) {
                return res.status(500).send();
            }
            handleFoundUser(user);
        });
    } else {
        Token.findOne({token: req.body.token, type: 'RESET'}, (err, token) => {
            if (err || token === null) {
                return res.status(500).send();
            }
            handleFoundToken(token);
        });
    }
};

const verifyEmail = (req, res) => {

    const handleFoundUser = (user) => {
        user.local.verified = true;
        user.save(saveErr => {
            if(saveErr) {
                return res.status(500).send();
            }
            return res.status(200).send();
        });
    };

    const handleFoundToken = (token) => {
        User.findById(token.userId, (userErr, user) => {
            if(userErr || user === null) {
                return res.status(500).send();
            }
            handleFoundUser(user);
        });
    };

    Token.findOne({ token: req.body.token, type: 'USER' }, (err, token) => {
        if(err || token === null) {
            return res.status(500).send();
        }
        handleFoundToken(token);
    });
};

const login = (req, res, next, passport) => {
    passport.authenticate('local-login', (error, user) => {
        if(!user) {
            return res.status(500).json({ field: 'username', error });
        }
        req.logIn(user, () => {
            res.status(200).json({
                id: user._id,
                name: user.local.username
            });
        });
    })(req, res, next);
};

const githubLogin = (req, res, next, passport) => {
    passport.authenticate('github', {
        failureRedirect: `/login`,
        successRedirect: `/round`,
        successReturnToOrRedirect: `http://${env.host}:${env.port}/round`
    },
    (req, res) => {
        res.redirect('/round')
    })
};

const signUp = (req, res, next, passport) => {
    passport.authenticate('local-signup', (error, user) => {
        if(!user) {
            return res.status(500).json({ field: 'username', error: error });
        }
        res.status(200).json({
            id: user._id,
            name: user.local.username
        });
    })(req, res, next);
};

const logout = (req, res) => {
    req.logOut();
    res.status(200).end();
    /*req.session.destroy((err) => {
        console.log('session destoryed');
    });*/
};

const userProfile = (req, res) => {
    const userId = req.body.userId;
    User.findById(userId)
        .then((user) => {
            if(user === null) {
                return res.status(500).send();
            }
            return res.status(200).json({
                verified: user.local.verified
            });
        })
        .catch(error => res.status(500).send(error))
};

const saveRound = (req, res) => {
    const { accuracy, wpm, language, snippet, typos, timestamp, userId } = req.body;
    const round = new Round({
        accuracy, wpm, language, snippet, typos, timestamp, userId
    });

    round.save((err, data) => {
        if(err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(200).send(data);
        }
    });
};

const getHistory = (req, res) => {
    const { userId } = req.body;
    Round.find({ userId }).then(history => {
        return res.status(200).send(history)
    }).catch(err => {
        return res.status(500).send(err);
    })
};

export const routes = {
    forgotPassword,
    resendVerificationEmail,
    resetPassword,
    verifyEmail,
    login,
    githubLogin,
    signUp,
    logout,
    userProfile,
    saveRound,
    getHistory
};