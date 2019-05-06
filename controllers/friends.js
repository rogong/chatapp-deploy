
const HttpStatus = require('http-status-codes');

const User = require('../models/userModels');


module.exports = {

    followUser(req, res) {
        const followUser = async () => {
            await User.update({
                _id: req.user._id,
                "following.userFollowed": { $ne: req.body.userFollowed }
            },
                {
                    $push: {
                        following: {
                            userFollowed: req.body.userFollowed
                        }
                    }
                });

            await User.update({
                _id: req.body.userFollowed,
                "followers.follower": { $ne: req.user._id }
            },
                {
                    $push: {
                        followers: {
                            follower: req.user._id
                        }
                    }
                });
        };

        followUser()
            .then(() => {
                res.status(HttpStatus.OK)
                    .json({ message: 'Following user now' });
            })
            .catch(err => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured' })
            });
    },

    unFollowUser(req, res) {
        const unfollowUser = async () => {
            await User.update({
                _id: req.user._id,
            },
                {
                    $pull: {
                        following: {
                            userFollowed: req.body.userFollowed
                        }
                    }
                });

            await User.update({
                _id: req.body.userFollowed,
            },
                {
                    $pull: {
                        followers: {
                            follower: req.user._id
                        }
                    }
                });
        };

        unfollowUser()
            .then(() => {
                res.status(HttpStatus.OK)
                    .json({ message: 'Unfollowing user now' });
            })
            .catch(err => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured' })
            });
    }
};