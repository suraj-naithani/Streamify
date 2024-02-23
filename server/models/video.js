const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imgUrl: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        likes: {
            type: [String],
            default: [],
        },
        dislikes: {
            type: [String],
            default: [],
        },
        user: {
            userID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            username: {
                type: String,
                required: true,
            }
        },
    },
    { timestamps: true }
);

const Video = mongoose.model('Video', VideoSchema);
module.exports = Video;