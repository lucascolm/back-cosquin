const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

var whitelist = ['https://cosquinquiz.netlify.app', 'https://siglo21quiz.netlify.app','https://main--gorgeous-beignet-497ad4.netlify.app']
var corsOptions = {
  origin: function (origin, callback) {
    console.log("origin: " + origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
server.name = 'API';

server.use(helmet())
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(cors(corsOptions));
//server.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'https://main--phenomenal-pony-798c98.netlify.app'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
