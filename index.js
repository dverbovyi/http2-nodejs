const http2 = require('spdy');
const http1_1 = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use('/', express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res) => {
    res.sendFile('dist/index.html', { root: __dirname });
});

const options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
}

const HTTPS_PORT = 443;

const log = port => {
    const ending = port === HTTPS ? 's' : '';

 return  `
    server is listening on http${ending}://localhost:${port}.
    You can open the URL in the browser.`
};

http2
    .createServer(options, app)
    .listen(HTTPS, () => {
        console.log(log(HTTPS));
    }
)

const HTTP_PORT = 80;

http1_1
    .createServer(app)
    .listen(HTTP, () => {
        console.log(log(HTTP));
    }
)
