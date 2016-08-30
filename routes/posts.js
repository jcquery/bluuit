'use strict';

const ev = require('express-validation');
const validations = require('../validations/posts');
const { checkAuth } = require('./middleware');
const knex = require('../knex');
const express = require('express');
const { camelizeKeys, decamelizeKeys } = require('humps');
const boom = require('boom');
const router = express.Router();

router.get('/api/posts', (req, res, next) => {
  knex('posts')
    .then((posts) => {
      res.status(200).send(camelizeKeys(posts));
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/api/posts/:topicId', (req, res, next) => {
  const topicId = Number.parseInt(req.params.topicId);

  if (Number.isNaN(topicId)) {
    return boom.create(400, 'Invalid Topic Id');
  }

  knex('posts')
    .where('topic_id', topicId)
    .then((postsByTopic) => {
      res.status(200).send(camelizeKeys(postsByTopic));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/api/posts', checkAuth, ev(validations.post), (req, res, next) => {
  const { description, imageUrl, title, topicId } = req.body;
  const newPost = { description, imageUrl, title, topicId };

  newPost.userId = req.token.userId;
  const row = decamelizeKeys(newPost);

  knex('posts')
    .insert(row, '*')
    .then((post) => {
      res.status(200).send(camelizeKeys(post));
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/api/posts', checkAuth, ev(validations.patch), (req, res, next) => {
  const { id, voteDirection } = req.body;

  knex('posts')
    .where('id', id)
    .first()
    .then((post) => {
      if (!post) {
        return boom.create(400, 'Invalid Post Id');
      }
      if (voteDirection > 0) {
        post.rating += 1;
      }
      else {
        post.rating -= 1;
      }

      return knex('posts')
        .where('id', post.id)
        .update(post);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
