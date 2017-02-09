import passport from 'passport';
import PassportLocal from 'passport-local';
import { User, Token } from './models';
import { sendVerificationEmail } from './mailer';
import * as env from './env';

export default () => {
    const LocalStrategy = PassportLocal.Strategy;

    passport.serializeUser((user, done) => {
        if(user.github) {
            done(null, {
                id: user._id,
                name: user.github.email,
                avatar: user.github.avatar,
                verified: user.github.verified
            });
        }else {
            done(null, {
                id: user._id,
                name: user.local.username,
                avatar: '',
                verified: user.local.verified
            });
        }
    });

    passport.deserializeUser((user, done) => {
        User.findById(user.id)
            .then(u => done(null, u))
            .catch(err => done(err, false));
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, username, password, done) => {
            User.findOne({'local.username': username})
                .then((user) => {
                    if(user) {
                        return done({ message: 'User already exists.' }, false);
                    }
                    const newUser = new User();
                    newUser.local.username = username;
                    newUser.local.email = req.body.email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.save()
                        .then(() => {
                            Token.new(newUser._id, 'USER')
                                .then(token => {
                                    sendVerificationEmail(newUser.local.email, token.token)
                                        .then(() => done(null, newUser))
                                        .catch(emailError => done(emailError, false));
                                })
                                .catch(tokenError => done(tokenError, false))
                        })
                        .catch(saveError => done(saveError, false))
                })
                .catch(error => done(error))
        }
    ));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, username, password, done) => {
            User.findOne({ 'local.username': username })
                .then(user => {
                    if(!user || !user.validPassword(password)) {
                        done({
                            message: `Having trouble logging you in given the username: ${username}`
                        }, false);
                    }
                    done(null, user);
                })
                .catch(error => done(error, false))
        }));

    const GitHubStrategy = require('passport-github').Strategy;

    passport.use(new GitHubStrategy({
            clientID: env.githubClientId,
            clientSecret: env.githubClientSecret,
            callbackURL: `http://${env.host}:${env.port}/api/github/callback`,
            profileFields: ['username']
        },
        (accessToken, refreshToken, profile, cb) => {
            const { id, username, photos, emails } = profile;
            const avatar = photos[0].value;
            const email = emails[0].value;

            User.find({ '$or': [
                {'github.id': id}, {'local.email': email }
            ]}).then(users => {
                const foundUser = users[0];

                const githubConfig = {
                    id: id,
                    username: username,
                    email: email,
                    avatar: avatar,
                    verified: true
                };

                if(!foundUser) {
                    const newUser = new User({
                        local: {
                            username: username,
                            password: refreshToken,
                            email: email,
                            verified: true
                        },
                        github: githubConfig
                    });

                    newUser.save((err, data) => {
                        cb(err, data);
                    })
                } else {
                    User.findOneAndUpdate({ _id: foundUser._id },
                        {
                            github: githubConfig, 'local.verified': true
                        }, err => {
                        if(err)
                            cb(err, null);
                        cb(null, foundUser);
                    });

                }
            }).catch(err => {
                cb(err, null);
            });
        }
    ));
    
    return passport;
}