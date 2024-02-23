const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    img: {
        type: String,
    },
    subscribers: {
        type: Number,
        default: 0,
    },
    subscribedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    fromGoogle: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashPassword;
    } catch (error) {
        next(error);
    }
})

userSchema.methods.comparePassword = async function (password) {
    // console.log(this);
    return bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
            process.env.JWT,
            {
                expiresIn: "30d",
            }
        )
    } catch (error) {
        console.error(error);
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;