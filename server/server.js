const express = require('express');
const app = express();
const jwt = require('express-jwt');
const cors = require('cors');
require('dotenv').config();
const mongo = require('./db');
const bodyParser = require('body-parser');

if (!process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_SECRET) {
  throw 'Make sure you have AUTH0_CLIENT_ID and AUTH0_SECRET in your .env file';
}

// const origin = 'http://mern.surge.sh';
// const origin = 'http://smart-rest.surge.sh';
const origin = 'http://localhost:3000';

var authenticate = jwt({
  secret: process.env.AUTH0_SECRET,
  audience: process.env.AUTH0_CLIENT_ID
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// body-parse reads a form's input and stores it as a javascript object accessible through req.body
app.use(cors());

app.get('/', function (req, res) {
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  mongo.find({}, (err, tutorials) => {
    if (err) res.sendStatus(400);
    res.json(tutorials);
  });
});

app.post('/api/add', authenticate, function (req, res) {
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  mongo.create({
    desc: req.query.desc,
    title: req.query.title,
    author: req.query.author,
    link: req.query.link,
    id: req.query.id,
    edited: true}, (err, tutorial) => {
    if (err) return console.error(err);
    res.json(tutorial._id);
  });
});

app.put('/api/edit', authenticate, function (req, res) {
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  mongo.findOneAndUpdate({_id: req.query._id},
    {
      image: req.query.image,
      title: req.query.title,
      author: req.query.author,
      link: req.query.link,
      id: req.query.id},
    (err, tutorial) => {
      if (err) return console.error(err);
    });
});

app.delete('/api/delete', authenticate, function (req, res) {
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  console.log(req.query.id);
  mongo.find({_id: req.query.id}).remove().exec();
});

// listen for requests :)
app.listen(3001);
