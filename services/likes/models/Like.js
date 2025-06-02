const mongoose = require('../../db');

const likeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' }
}, { timestamps: true });

module.exports = mongoose.model('Like', likeSchema);
