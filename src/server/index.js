import path from 'path';
import httpProxy from 'http-proxy';
import cors from 'cors';
import express from 'express';
import expressPromise from 'express-promise';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import configurePassport from './configurePassport';
import defaultRoute, { routes } from './routes';
import * as env from './env';

const publicPath = path.resolve(__dirname, './../../', 'dist', 'public');
const { nodeEnv, host, port, devHost, devPort, mongoUri } = env;

console.log(`\nRunning with env variables ${JSON.stringify(env, null, ' ')}`);
console.log(`Static assets served at ${publicPath}`);

const app = express();

const proxy = httpProxy.createProxyServer();
if (nodeEnv !== 'production') {
    var bundle = require('./bundler.js');
    bundle();

    app.all('/build/*', (req, res) => {
        proxy.web(req, res, {
            target: `http://${devHost}:${devPort}`
        });
    });
}

proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
});

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri);
const passport = configurePassport();

app.use(expressPromise());
app.use(cors());
app.use(bodyparser.json());
app.use(cookieParser());
app.use(cookieSession({
    secret: 'secret',
    cookie: { maxAge: 3600 }
}));
app.use(passport.initialize());
app.use(passport.session());

const router = express.Router();

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {
        failureRedirect: `/login`,
        successRedirect: `/round`
    }),
    (req, res) => {
        res.redirect('/round')
    }
);

router.post('/signUp', (req, res, next) => {
    routes.signUp(req, res, next, passport);
});
router.post('/login', (req, res, next) => {
    routes.login(req, res, next, passport);
});
router.get('/logout', routes.logout);
router.post('/verifyEmail', routes.verifyEmail);
router.post('/sendVerificationEmail', routes.resendVerificationEmail);
router.post('/forgotPassword', routes.forgotPassword);
router.post('/resetPassword', routes.resetPassword);
router.post('/userProfile', routes.userProfile);
router.post('/saveRound', routes.saveRound);
router.post('/getHistory', routes.getHistory);

app.use('/api', router);
app.use('/', defaultRoute);
app.use(express.static(publicPath));

app.listen(port, error => {
    if(error) {
        console.error(error);
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open up http://${host}:${port}/ in your browser.`);
    }
});