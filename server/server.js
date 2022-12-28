//in server/server.js
const express = require('express');
const client = require('./elasticsearch/client');

const app = express();

const port = 3002;

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
