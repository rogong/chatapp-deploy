
const HttpStatus = require('http-status-codes');

const User = require('../models/userModels');


module.exports = {

    async getAllUsers(req, res) {
        await User.find({})
            .populate('posts', 'postId')
            .populate('following.userFollowed')
            .populate('folowers.follower')
            .then(result => {
                res.status(HttpStatus.OK)
                    .json({ message: 'All users', result });

            })
            .catch(err => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured' });
            });
    },

    async getUser(req, res) {

        await User.findOne({ _id: req.params.id })

            .populate('following.userFollowed')
            .populate('folowers.follower')
            .populate('posts.postId')

            .then(result => {

                res.status(HttpStatus.OK)

                    .json({ message: 'User By Id', result });

            })
            .catch(err => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured' });
            });

    },

    getUserByUserName(req, res) {

        User.findOne({ username: req.params.username })
            .populate('posts.postId')
            .populate('following.userFollowed')
            .populate('folowers.follower')
            .then(result => {
                res.status(HttpStatus.OK)
                    .json({ message: 'User By UserName', result });

            })
            .catch(err => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured' });
            });
    }
};