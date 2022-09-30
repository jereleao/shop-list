const express = require('express')
const path = require('path')

const app = express();

let listenPort = process.env.PORT || 3000;

app.use(
  express.static(path.resolve(__dirname, '..', 'build'))
);

app.listen(listenPort, () => {
  console.log("server running on port " + listenPort);
})