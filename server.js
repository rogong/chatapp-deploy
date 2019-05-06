const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');



const app = express();

const dbConfig = require('./config/secret');

// Integrate IO Server
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    res.header("Access-Controller-Allow-Methods", "OPTIONS, HEAD, PUT, GET, POST, PATCH, DELETE");

    next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(logger('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { useNewUrlParser: true });


require('./socket/streams')(io);

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const friendRoutes = require('./routes/friendRoutes');

app.use('/api/chatapp', authRoutes);
app.use('/api/chatapp', postRoutes);
app.use('/api/chatapp', userRoutes);
app.use('/api/chatapp', friendRoutes);

server.listen(3000, () => {
    console.log('Running on port 3000');
})