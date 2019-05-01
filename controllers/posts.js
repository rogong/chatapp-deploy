
const Joi = require('joi');
const HttpStatus = require('http-status-codes');

const Post = require('../models/postModels');
const User = require('../models/userModels');

module.exports = {
    addUser(req, res) {
        const schema = Joi.object().keys({
            post: Joi.string().required(),
        });
        const { error } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({ msg: error.details });

        }

        const body = {
            user: req.user_id,
            username: req.user.username,
            post: req.body.post,
            created: new Date()
        }

        Post.create(body).then(async (post) => {
            await User.update({
                _id: req.user._id
            },
                {
                    $push: {
                        posts: {
                            postId: post._id,
                            post: post.post,
                            created: new Date()
                        }
                    }

                })
            res.status(HttpStatus.OK)
                .json({ message: 'Post created', post });
        })
            .catch(err => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured' })
            })
    },

    async  getAllPosts(req, res) {
        try {
            const posts = await Post.find({})
                .populate('user')
                .sort({ created: -1 })

            return res.status(HttpStatus.OK)
                .json({ message: 'All posts', posts });

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: 'Error occured' })
        }

    }
};
