import { host, port, mailgunApiKey, mailgunDomain } from './env';
import Mailgun from 'mailgun-js';

const mailgun = new Mailgun({
    apiKey: mailgunApiKey,
    domain: mailgunDomain
});

export function sendEmail(data, fn) {
    if(!data.from) {
        return fn(new Error('Email address required'));
    }
    if(!data.to) {
        return fn(new Error('Email address required'));
    }
    if(!data.subject) {
        return fn(new Error('Must contain a subject'));
    }
    if(!data.html) {
        return fn(new Error('Must contain a message'));
    }
    if(env.nodeEnv === 'test') {
        return fn(null, 'OK');
    }

    return mailgun.messages().send();
}

export function sendVerificationEmail(email, token, fn) {
    const data = {
        from: 'tripletriad@gmail.com',
        to: email,
        subject: 'Play Triple Triad',
        html: `
            Verify your account with the following link:
            http://${host}:${port}/verify/${token}
            Welcome to Triple Triad were you can play with your friends.
        `
    };
    return sendEmail(data);
}

export function sendResetPasswordEmail(email, token, fn) {
    const data = {
        from: 'tripletriad@gmail.com',
        to: email,
        subject: 'Reset password for Triple Triad',
        html: `
            Reset password with the following link:
            http://${host}:${port}/reset/${token}
            This link will not expire... yet XD.
        `
    };
    return sendEmail(data);
}