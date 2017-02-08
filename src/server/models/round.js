import mongoose from 'mongoose';

var RoundSchema = mongoose.Schema({
    accuracy: String,
    wpm: String,
    userId: String,
    timestamp: String
});

export default mongoose.model('Round', RoundSchema);