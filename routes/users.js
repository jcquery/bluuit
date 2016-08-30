'use strict';

const ev = require('express-validation');
const validations = require('../validations/users');
const knex = require('../knex');
const express = require('express');
const bcrypt = require('bcrypt-as-promised');
const { camelizeKeys, decamelizeKeys } = require('humps');
const boom = require('boom');

const router = express.Router();

router.post('/api/users', ev(validations.post), (req, res, next) => {
  const { firstName, lastName, password, username } = req.body;

  knex('users')
    .select(knex.raw('1=1'))
    .where('username', username)
    .first()
    .then((exists) => {
      if (exists) {
        throw boom.create(400, 'Username already exists');
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const newUser = { firstName, lastName, hashedPassword, username };
      const row = decamelizeKeys(newUser);

      return knex('users')
        .insert(row, '*');
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
