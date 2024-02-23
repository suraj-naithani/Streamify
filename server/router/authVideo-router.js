const express = require('express');
const router = express.Router();
const video = require('../controllers/video-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.post('/uploadVideo', authMiddleware, video.uploadVideo);
router.get('/allVideos', video.allVideos);
router.get("/random", video.randomVideo);
router.get('/allMyVideos/:id', authMiddleware, video.allMyVideos);
router.get('/singleVideo/:id', video.singleVideo);
router.put('/subs/:id', authMiddleware, video.subs);
router.put('/unsubs/:id', authMiddleware, video.unsubs);
router.put('/views/:id', video.addViews);
router.get('/trend', video.trend);
router.get('/search', video.search);
router.put('/like/:id', authMiddleware, video.like);
router.put('/dislike/:id', authMiddleware, video.dislike);
router.patch('/update/:id', authMiddleware, video.updateVideo);
router.delete('/delete/:id', authMiddleware, video.deleteVideo);


module.exports = router;