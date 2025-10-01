const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const topic = require('./routes/topic');
const question = require('./routes/question');
const comment = require('./routes/comment');


const baseApiPath = '/api';
const baseDirLocation = __dirname.substring(0, __dirname.lastIndexOf('/'));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.urlencoded({extended: false})).use(bodyParser.json());

app.use(`${baseApiPath}/topics`, topic);
app.use(`${baseApiPath}/questions`, question);
app.use(`${baseApiPath}/comments`, comment);

app.use('/', express.static(path.join(baseDirLocation, 'dist')));

app.use('*', (req, res) => {
    res.sendFile(baseDirLocation + '/dist/index.html');
});

module.exports = app;
