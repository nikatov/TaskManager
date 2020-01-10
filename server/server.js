'use strict';

const express = require('express');
const body = require('body-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());

var stages = [];
var cards = [];

app.get('/api/stage', function (req, res) {
  let json = {}
  for (let i in stages) {
    json[i] = { "name": stages[i] };
  }
  res
  .json(json)
  .status(200)
  .end();

  console.log('');
  console.log(stages);
  console.log(cards);
});

app.post('/api/stage', function (req, res) {
  let name = req.body.name;
  stages.unshift(name);
  for (let i in cards) {
    cards[i].stage = cards[i].stage + 1;
  }
  res
  .status(201)
  .end();

    console.log('');
  console.log(stages);
  console.log(cards);
});

app.delete('/api/stage', function (req, res) {
  let id = req.body.id;
  stages.splice(id, 1);
  res
  .status(201)
  .end();

  console.log('');
  console.log(stages);
  console.log(cards);
});

app.get('/api/card', function (req, res) {
  let cardList = {}
  console.log(req.query)
  for (let i in cards) {
    if (cards[i].stage == req.query.id) {
      cardList[i] = { "name": cards[i].name }
    }
  }
  console.log("ответ с '/api/cards': ", cardList)
  res
  .json(cardList)
  .status(200).end();

  console.log('');
  console.log(stages);
  console.log(cards);
});

app.post('/api/card', function (req, res) {
  let name = req.body.name;
  console.log('name', name);
  console.log('cards', cards);
  cards.push({
    "name": name,
    "stage": 0
  });
  console.log('cards', cards);
  res
  .status(201)
  .end();

  console.log('');
  console.log(stages);
  console.log(cards);
});

app.delete('/api/card', function (req, res) {
  let id = req.body.id;
  cards.splice(id, 1);
  res
  .status(201)
  .end();

  console.log('');
  console.log(stages);
  console.log(cards);
});

app.put('/api/next', function (req, res) {
  let id = req.body.id;
  console.log('id', id);
  cards[id].stage = cards[id].stage + 1;
  if (cards[id].stage >= stages.len) {
    cards.splice(id, 1);
  }
  res
  .status(201)
  .end();

  console.log('');
  console.log(stages);
  console.log(cards);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Сервер слушает порт ${port}`);
});