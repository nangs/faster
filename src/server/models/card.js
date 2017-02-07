import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    owner: String,
    name: String,
    comment: String,
    userId: String,
    order: Number
});

export default mongoose.model('Card', CardSchema);