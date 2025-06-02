const mongoose = require('../../db');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 }
}, { timestamps: true });

// Eviter de redéfinir le modèle s'il existe déjà
module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);

//module.exports = require('../../models/Post');
