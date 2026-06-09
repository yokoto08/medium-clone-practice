const User = require('./../models/User');
const Article = require('./../models/Article');

module.exports = {
    addUser: async (req, res, next) => {
        try {
            const newUser = await new User(req.body).save();
            res.status(200).send(newUser);
        } catch (err) {
            res.status(400).send(err);
        }
    },
    getUser: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).send('User not found');
            res.status(200).send(user);
        } catch (err) {
            res.status(400).send(err);
        }
    },
    followUser: async (req, res, next) => {
        try {
            const user = await User.findById(req.body.id);
            await user.follow(req.body.user_id);
            res.json({ msg: "followed" });
        } catch (err) {
            res.status(400).send(err);
        }
    },
    getUserProfile: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            const followers = await User.find({ 'following': req.params.id });
            for (let follower of followers) {
                user.addFollower(follower);
            }
            const articles = await Article.find({ 'author': req.params.id });
            res.json({ user: user, articles: articles });
        } catch (err) {
            res.status(400).send(err);
        }
    }
};