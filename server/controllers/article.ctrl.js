const Article = require('./../models/Article');
const User = require('./../models/User');
const cloudinary = require('cloudinary').v2;

module.exports = {
    deleteArticle: (req, res, next) => {
        Article.findByIdAndDelete(req.params.id).then((article) => {
            return res.sendStatus(200);
        }).catch(next);
    },
    addArticle: async (req, res, next) => {
        try {
            let { text, title, claps, description } = req.body;
            let obj = { text, title, claps, description, feature_img: '' };
            
            if (req.files && req.files.image) {
                const result = await cloudinary.uploader.upload(req.files.image.path, { resource_type: 'image', folder: 'medium-clone' });
                obj.feature_img = result.url;
            }
            
            const article = await new Article(obj).save();
            const user = await User.findById(req.body.author_id);
            if (user) {
                await article.addAuthor(user._id);
            }
            res.status(200).send(article);
        } catch (err) {
            res.status(400).send(err);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const articles = await Article.find({}).populate('author').populate('comments.author');
            res.status(200).send(articles);
        } catch (err) {
            res.status(400).send(err);
        }
    },
    clapArticle: async (req, res, next) => {
        try {
            const article = await Article.findById(req.body.article_id);
            await article.clap();
            res.status(200).json({ msg: "Done" });
        } catch (err) {
            res.status(400).send(err);
        }
    },
    commentArticle: async (req, res, next) => {
        try {
            const article = await Article.findById(req.body.article_id);
            await article.comment({ author: req.body.author_id, text: req.body.comment });
            res.status(200).json({ msg: "Done" });
        } catch (err) {
            res.status(400).send(err);
        }
    },
    getArticle: async (req, res, next) => {
        try {
            const article = await Article.findById(req.params.id).populate('author').populate('comments.author');
            res.status(200).send(article);
        } catch (err) {
            res.status(400).send(err);
        }
    }
};