const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Import des routes de chaque "service"
const authRoutes = require('./services/auth/routes');
const postRoutes = require('./services/posts/routes');
const likeRoutes = require('./services/likes/routes');

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/likes', likeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway listening on port ${PORT}`);
});
