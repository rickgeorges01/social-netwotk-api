const express = require('express');
const router = express.Router();
const Post = require('../posts/models/Post');
const authMiddleware = require('../auth/middleware/authMiddleware');

// Créer un post (sécurisé avec authMiddleware)
router.post('/', authMiddleware, async (req, res) => {
    const userId = req.user.id;  // Récupéré du token JWT
    const { content } = req.body;
    try {
        const post = new Post({ userId, content });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        console.error("Error in POST /posts:", err);
        res.status(500).json({ error: err.message });
    }
});

// Récupérer tous les posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.error("Error in GET /posts:", err);
        res.status(500).json({ error: err.message });
    }
});

// Mettre à jour un post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        console.error("Error in PUT /posts/:id:", err);
        res.status(500).json({ error: err.message });
    }
});

// Supprimer un post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json({ message: 'Post deleted' });
    } catch (err) {
        console.error("Error in DELETE /posts/:id:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
