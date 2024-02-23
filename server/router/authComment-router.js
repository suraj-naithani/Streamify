const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const comment = require('../controllers/comment-controller');

router.post('/addComment/:id', authMiddleware, comment.addComment);
router.get('/getComment/:videoId', comment.getComment);

module.exports = router;