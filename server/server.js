const http = require('http');
const app = require('./app');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
