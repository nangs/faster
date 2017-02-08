import { Token, User } from './models';
import { sendResetPasswordEmail, sendVerificationEmail } from './mailer';

export default (req, res) => {

    const user = (
        req.session
        && req.session.passport
        && req.session.passport.user
    ) ? req.session.passport.user : null;

    const initialState = {
        atom: {
            user: user,
            auth: !!user
        }
    };

    const markup = `<!doctype html>
        <html>
          <head>
            <title>iMap</title>
            <link rel="icon" type="image/png" href="profile.png" />
            <link rel="stylesheet" type="text/css" href="styles.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
            <script src="https://code.highcharts.com/highcharts.js"></script>
            <script src="https://code.highcharts.com/highcharts-more.js"></script>
            <script src="https://code.highcharts.com/modules/solid-gauge.js"></script>
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

    const handleFoundUser = (user) => {
        sendVerificationEmail(user.local.email, token.token, emailErr => {
            if(emailErr) {
                return res.status(500).send();
            }
            return res.json({ sent: true });
        });
    };

    const handleFoundToken = (token) => {
        User.findById(userId, (userErr, user) => {
            if(userErr || user === null) {
                return res.status(500).send();
            }
            handleFoundUser(user);
        });
    };

    const userId = req.body.userId;
    Token.findOne({ userId: userId, type: 'USER' }, (err, token) => {
        if(err || token === null) {
            return res.status(500).send();
        }
        handleFoundToken(token);
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

    Token.findOne({ token: req.body.token, type: 'RESET' }, (err, token) => {
        if(err || token === null) {
            return res.status(500).send();
        }
        handleFoundToken(token);
    });
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

export const routes = {
    forgotPassword,
    resendVerificationEmail,
    resetPassword,
    verifyEmail,
    login,
    signUp,
    logout,
    userProfile
};