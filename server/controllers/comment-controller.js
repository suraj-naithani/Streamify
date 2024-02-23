const Comment = require('../models/comment');

const addComment = async (req, res, next) => {
    try {
        const newComment = new Comment({
            ...req.body,
            userId: req.user.id,
            videoId: req.params.id
        })
        const savedComment = await newComment.save();
        res.status(200).send(savedComment);
    } catch (error) {
        next(error);
    }
}
const getComment = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}

module.exports = { addComment, getComment }