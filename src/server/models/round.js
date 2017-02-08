import mongoose from 'mongoose';

var RoundSchema = mongoose.Schema({
    accuracy: String,
    wpm: String,
    language: String,
    snippet: String,
    typos: Array,
    userId: String,
    timestamp: String
});

export default mongoose.model('Round', RoundSchema);