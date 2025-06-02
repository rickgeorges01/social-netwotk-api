const express = require('express');
const router = express.Router();
const Like = require('../likes/models/Like');
const Post = require('../posts/models/Post');
const authMiddleware = require('../auth/middleware/authMiddleware');

// Ajouter un like
router.post('/', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { postId } = req.body;
    console.log("POST /likes received:", { userId, postId });

    try {
        const existingLike = await Like.findOne({ userId, postId });
        if (existingLike) {
            console.log("Post already liked");
            return res.status(400).json({ message: 'Post already liked' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            console.log("Post not found for ID:", postId);
            return res.status(404).json({ message: 'Post not found' });
        }

        const like = new Like({ userId, postId });
        await like.save();
        console.log("Like saved:", like);

        await Post.updateOne({ _id: postId }, { $inc: { likes: 1 } });
        console.log("Post likes incremented");

        res.status(201).json({ message: 'Like added' });
    } catch (err) {
        console.error("Error in POST /likes:", err);
        res.status(500).json({ error: err.message });
    }
});

// Supprimer un like
router.delete('/', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { postId } = req.body;
    try {
        const deletedLike = await Like.findOneAndDelete({ userId, postId });
        if (!deletedLike) {
            return res.status(404).json({ message: 'Like not found' });
        }

        await Post.updateOne({ _id: postId }, { $inc: { likes: -1 } });
        console.log("Like removed and post likes decremented");

        res.json({ message: 'Like removed' });
    } catch (err) {
        console.error("Error in DELETE /likes:", err);
        res.status(500).json({ error: err.message });
    }
});

// Récupérer tous les likes
router.get('/', async (req, res) => {
    try {
        const likes = await Like.find();
        console.log("Likes found:", likes);
        res.json(likes);
    } catch (err) {
        console.error("Error in GET /likes:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
