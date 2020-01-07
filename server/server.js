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

const stages = {
  "1": {
    "name": "начальная стадия"
  },
  "2": {
    "name": "вторая стадия"
  }
};

const cards = {
  "1": {
    "name": "первая карточка",
    "stage": 2
  },
  "2": {
    "name": "вторая карточка",
    "stage": 1
  },
  "3": {
    "name": "третья карточка",
    "stage": 2
  }
};

app.get('/api/stage', function (req, res) {
  res
  .json(stages)
  .status(200)
  .end();
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
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Сервер слушает порт ${port}`);
});