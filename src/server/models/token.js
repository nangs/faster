import crypto from 'crypto';
import mongoose from 'mongoose';


const tokenFactory = (tokenType, id, fn) => {
    tokenGenerator(id).then(token => {
        tokenType.token = token;
        tokenType.userId = id;
        tokenType.save(fn);
    });
};


const tokenGenerator = (userId) => new Promise(resolve => {
    crypto.randomBytes(48, (ex, buf) => {
        const token = buf.toString('base64')
            .replace(/\//g, '_')
            .replace(/\+/g, '-')
            .toString()
            .slice(1, 24);
        resolve(`${userId}-${token}`);
    });
});


let Token;

let TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        index: true
    },
    token: {
        type: String,
        index: true
    },
    type: {
        type: String
    }
});

TokenSchema.statics.new = (userId, type, fn) => {
    const token = new Token();
    tokenGenerator(userId).then(token => {
        token.token = token;
        token.userId = userId;
        token.type = type;
        token.save(fn);
    });
};

Token = mongoose.model('Token', TokenSchema);

export default Token;