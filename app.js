const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const controllers = require('./app/controllers');
const config = require('./config');


const app = express();
app.use(express.json());

const PORT = config.server.port;
const MONGODB_URI = config.mongo.dbUri;

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(function (err, req, res, next) {
  if (err.code === 'credentials_required') {
    res.status(401).send({
      status: 401,
      message: errorMessages.MISSING_AUTHORIZATION_HEADER,
      err: err
    });
  }
  if (err.code === 'invalid_token')
    res.status(401).send({
      status: 401,
      message: errorMessages.INVALID_TOKEN,
      err: err
    });
});

controllers.forEach(controller => controller.apply({app}));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



app.listen(PORT, () => {
  console.log('Server is running on ' + PORT);
});
