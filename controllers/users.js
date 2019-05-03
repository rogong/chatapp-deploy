
const HttpStatus = require('http-status-codes');

const User = require('../models/userModels');


module.exports = {

    async getAllUsers(req, res) {
        await User.find({}).populate('posts', 'postId')
            .then(result => {
                res.status(HttpStatus.OK)
                    .json({ message: 'All users', result });

            })
            .catch(err => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured' });
            });
    }
};