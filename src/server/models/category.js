import mongoose from 'mongoose';

let CategorySchema = new mongoose.Schema({
    owner: String,
    name: String,
    order: Number,
    cards: []
});

export default mongoose.model('Category', CategorySchema);