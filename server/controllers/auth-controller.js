const User = require('../models/user');
const jwt = require('jsonwebtoken')

const home = async (req, res) => {
    try {
        res.status(200).send("Hello, world!");
    } catch (error) {
        res.status(400).send({ msg: "Not Found" });
    }
}

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existUser = await User.findOne({ email: email });

        if (existUser) {
            return res.status(404).send({ msg: "user already exists" });
        }

        const userCreated = await User.create({ username, email, password });

        res.status(200).send({
            msg: "Registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        console.error(error);
        res.status(404).send({ msg: "not registered", error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (!userExists) {
            return res.status(404).send({ msg: "User not found" });
        }

        const isPasswordValid = await userExists.comparePassword(password);
        if (isPasswordValid) {
            res.status(200).send({
                msg: "Login successful",
                token: await userExists.generateToken(),
                userId: userExists._id.toString(),
            });
        } else {
            res.status(401).send({ msg: "invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(404).send({ msg: "Login Error" });
    }
}

const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const token = await user.generateToken();

            res.status(200).json({
                user: user._doc,
                token: token,
            });
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true,
            });

            const savedUser = await newUser.save();
            const token = await savedUser.generateToken();

            res.status(200).json({
                user: savedUser._doc,
                token: token,
            });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }

}

const user = (req, res) => {
    try {
        const userData = req.user;
        return res.status(200).send({ userData });
    } catch (error) {
        console.log(error);
    }
}

const users = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = { home, register, login, user, users, googleAuth };