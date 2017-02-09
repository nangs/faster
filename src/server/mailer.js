import Mailgun from 'mailgun-js';
import * as env from './env';
const { host, port, mailgunApiKey, mailgunDomain, nodeEnv } = env;

const mailgun = new Mailgun({
    apiKey: mailgunApiKey,
    domain: mailgunDomain
});

export const sendEmail = (data) => new Promise((resolve, reject) => {
    if(!data.from) {
        reject(new Error('Email address required'));
    }
    if(!data.to) {
        reject(new Error('Email address required'));
    }
    if(!data.subject) {
        reject(new Error('Must contain a subject'));
    }
    if(!data.html) {
        reject(new Error('Must contain a message'));
    }
    if(nodeEnv === 'test') {
        reject(null);
    }

    mailgun.messages().send(data, (err, body) => {
        if(err) reject(err);
        resolve(body);
    });
});

export function sendVerificationEmail(email, token) {
    const data = {
        from: 'faster@gmail.com',
        to: email,
        subject: 'Practice Coding with Faster',
        html: `
            Verify your account with the following link:
            http://${host}:${port}/verify/${token}
            Welcome to Faster were you and other coders can practice typing!
        `
    };
    return sendEmail(data);
}

export function sendResetPasswordEmail(email, token) {
    const data = {
        from: 'faster@gmail.com',
        to: email,
        subject: 'Reset password for Faster Account',
        html: `
            Reset password with the following link:
            http://${host}:${port}/reset/${token}
            This link will not expire... yet XD.
        `
    };
    return sendEmail(data);
}