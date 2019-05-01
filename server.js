const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');



const app = express();

const dbConfig = require('./config/secret');
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

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

app.use('/api/chatapp', postRoutes);
app.use('/api/chatapp', authRoutes);


app.listen(3000, () => {
    console.log('Running on port 3000');
})