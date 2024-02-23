const User = require('../models/user');
const Video = require('../models/video');

const uploadVideo = async (req, res) => {
    try {
        const response = req.body;
        const uploaded = await Video.create(response);
        return res.status(200).json(uploaded);
    } catch (error) {
        console.error(error);
        return res.status(404).json({ msg: "Video uploaded Failed" });
    }
}

const allVideos = async (req, res, next) => {
    try {
        const allVideos = await Video.find();
        return res.status(200).json(allVideos);
    } catch (error) {
        next(error);
        return res.status(400).json({ msg: "error message" });
    }
}

const randomVideo = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 10 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

const allMyVideos = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const myVideos = await Video.find({ 'user.userID': userId });
        return res.status(200).json(myVideos);
    } catch (error) {
        next(error);
        return res.status(400).json({ msg: "error message" });
    }
}

const singleVideo = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Video.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const subs = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (user.subscribedUsers.includes(req.user.id)) {
            return res.status(400).json("User is already subscribed");
        }
        await User.findByIdAndUpdate(req.params.id, {
            $push: { subscribedUsers: req.user.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
        });
        res.status(200).json("subscribe successfully");
    } catch (err) {
        console.error(err);
        next(err);
    }
}

const unsubs = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user.subscribedUsers.includes(req.user.id)) {
            return res.status(400).json("User is not subscribed");
        }
        await User.findByIdAndUpdate(req.params.id, {
            $pull: { subscribedUsers: req.user.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 },
        });
        res.status(200).json("unsubscribe successfully")
    } catch (err) {
        next(err);
    }
}

const addViews = async (req, res, next) => {
    try {
        const videoId = req.params.id;

        await Video.findByIdAndUpdate(videoId, {
            $inc: { views: 1 },
        });
        res.status(200).json("view increased")
    } catch (error) {
        next(error);
    }
}

const trend = async (req, res, next) => {
    try {
        const video = await Video.find().sort({ views: -1 });
        res.status(200).json(video);
    } catch (error) {
        next(error);
    }
}

const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({
            title: { $regex: query, $options: "i" },
        }).limit(40);
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
}

const like = async (req, res, next) => {
    const videoId = req.params.id;
    const currentUser = req.user._id;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: currentUser },
            $pull: { dislikes: currentUser },
        })
        res.status(200).json("Liked")

    } catch (error) {
        next(error);
    }
};


const dislike = async (req, res, next) => {
    const currentUser = req.user._id;
    const videoId = req.params.id;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: currentUser },
            $pull: { likes: currentUser },
        })
        res.status(200).json("dislikes");
    } catch (error) {
        next(error);
    }
}

const updateVideo = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateUserVideo = req.body;
        const updateVideo = await Video.updateOne({ _id: id }, {
            $set: updateUserVideo,
        })
        return res.status(200).json(updateVideo);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteVideo = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Video.deleteOne({ _id: id });
        return res.status(200).json("Video deleted successfully");
    } catch (error) {
        next(error);
    }
}

module.exports = { uploadVideo, allVideos, subs, singleVideo, allMyVideos, randomVideo, addViews, trend, search, like, dislike, unsubs, updateVideo, deleteVideo };