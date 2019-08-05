const {promisify} = require('util');
const fs = require('fs');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const compression = require('compression');
const express = require('express');
const removeHash = require('./middlewares/remove-hash');

const app = express();
const server = http.createServer(app);

const production = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

const staticOptions = {
  maxAge: production ? (365 * 24 * 60 * 60 * 1000) : 0
}

app.use(removeHash);
app.use(bodyParser.json());
app.use(compression());

// static files
app.use('/static', serveStatic(path.join(__dirname, '../dist/static'), staticOptions));

// routes
app.get('/health', (req, res) => res.send('server is up.'));
app.use('/service-worker.js', require('./service-worker'));
app.use('/', require('./dynamic'));

server.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
