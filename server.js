const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const _ = require('lodash');

const app = express();

const dbConfig = require('./config/secret');

// Integrate IO Server
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const { User } = require('./Helpers/UserClass');

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(logger('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { useNewUrlParser: true });


require('./socket/streams')(io, User, _);
require('./socket/private')(io);

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const friendRoutes = require('./routes/friendRoutes');
const messageRoutes = require('./routes/messageRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.use('/api/chatapp', authRoutes);
app.use('/api/chatapp', postRoutes);
app.use('/api/chatapp', userRoutes);
app.use('/api/chatapp', friendRoutes);
app.use('/api/chatapp', messageRoutes);
app.use('/api/chatapp', imageRoutes);

server.listen(3000, () => {
    console.log('Running on port 3000');
})