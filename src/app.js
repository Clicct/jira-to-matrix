// @flow
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const conf = require('./config');
const bot = require('./bot');
const matrix = require('./matrix');
const logger = require('simple-color-logger')();
const {checkNodeVersion} = require('./utils');
const config = require('../config.js');
const queue = require('./queue');

if (!checkNodeVersion()) {
    process.exit(1);
}

let client = connectToMatrix(matrix);

process.on('uncaughtException', err => {
    if (err.errno === 'EADDRINUSE') {
        logger.error(`Port ${conf.port} is in use!\n${err}`);
    } else {
        logger.error(`Uncaught exception!\n${err}`);
    }
    process.exit(1);
});

const app = express();

app.use(bodyParser.json({strict: false}));

app.post('/', async function(req, res, next) {
    queue.push(req.body);

    if (client) {
        req.mclient = await client;
    } else {
        res.end();
    }
    
    next();
});

app.post('/', bot.createApp(express));

// version, to verify deployment
app.get('/', (req, res) => {
    res.end(`Version ${conf.version}`);
});
// end any request for it not to hang
app.use((req, res) => {
    res.end();
});

app.use(async function(err, req, res, next) {
    if (err) {
        logger.info(err);
        client = connectToMatrix(matrix);
    }
    res.end();
});

const server = http.createServer(app);
server.listen(conf.port, () => {
    logger.info(`Server is listening on port ${conf.port}`);
});

async function onExit() {
    await matrix.disconnect();
    if (server.listening) {
        server.close(() => {
            process.exit();
        });
        return;
    }
    process.exit();
}


async function connectToMatrix(matrix) {
    let client = await matrix.connect();
    if (!client) {
        client = await connectToMatrix(matrix);
    }
    return client;
}

process.on('exit', onExit);
process.on('SIGINT', onExit);
process.on('uncaughtException', onExit);
