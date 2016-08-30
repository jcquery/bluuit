'use strict';

const ev = require('express-validation');
const validations = require('../validations/topics');
const knex = require('../knex');
const express = require('express');
const { checkAuth } = require('./middleware')
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = express.Router();

router.get('/api/topics', (req, res, next) => {
  knex('topics')
    .then((topics) => {
      res.status(200).send(camelizeKeys(topics));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/api/topics', ev(validations.post), checkAuth, (req, res, next) => {
  const { name } = req.body;

  knex('topics')
    .insert({ name }, '*')
    .then((topics) => {
      res.send(topics[0]);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
