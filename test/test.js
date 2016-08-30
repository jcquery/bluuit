'use strict';

const request = require('supertest');
const assert = require('chai').assert;
const { suite, test } = require('mocha');
const server = require('../server');
const knex = require('../knex');

suite('get routes', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('GET /posts', (done) => {
    request(server)
      .get('/posts')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          "createdAt": "2016-07-23T14:26:16.000Z",
          "description": "What an awesome story.",
          "id": 1,
          "imageUrl": "https://b.thumbs.redditmedia.com/WTeAOJlQ98AfIVn7BjV_cDrDLXMuowwmJVo1p1xX5yg.jpg",
          "rating": 0,
          "title": "Dogs Are Not Allowed On NYC Subway Unless They're In A Carrier… So This Happened",
          "topicId": 1,
          "updatedAt": "2016-07-23T14:26:16.000Z",
          "userId": 1
        },
        {
          "createdAt": "2016-07-23T14:26:16.000Z",
          "description": "What an awesome story.",
          "id": 2,
          "imageUrl": "https://a.thumbs.redditmedia.com/pl1fM2jukfU2xW6hamMUF5dJ5gC_igj-1Z2oMwQM_90.jpg",
          "rating": 0,
          "title": "Wagging That Tail",
          "topicId": 1,
          "updatedAt": "2016-07-23T14:26:16.000Z",
          "userId": 1
        }
      ], done);
  });

  test('GET /posts/1', (done) => {
    request(server)
      .get('/posts/1')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
            "createdAt": "2016-07-23T14:26:16.000Z",
            "description": "What an awesome story.",
            "id": 1,
            "imageUrl": "https://b.thumbs.redditmedia.com/WTeAOJlQ98AfIVn7BjV_cDrDLXMuowwmJVo1p1xX5yg.jpg",
            "rating": 0,
            "title": "Dogs Are Not Allowed On NYC Subway Unless They're In A Carrier… So This Happened",
            "topicId": 1,
            "updatedAt": "2016-07-23T14:26:16.000Z",
            "userId": 1
        },
        {
            "createdAt": "2016-07-23T14:26:16.000Z",
            "description": "What an awesome story.",
            "id": 2,
            "imageUrl": "https://a.thumbs.redditmedia.com/pl1fM2jukfU2xW6hamMUF5dJ5gC_igj-1Z2oMwQM_90.jpg",
            "rating": 0,
            "title": "Wagging That Tail",
            "topicId": 1,
            "updatedAt": "2016-07-23T14:26:16.000Z",
            "userId": 1
        }
      ], done);
  });

  test('GET topics', (done) => {
    request(server)
      .get('/topics')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
            "createdAt": "2016-07-23T14:26:16.000Z",
            "id": 1,
            "name": "Dogs",
            "updatedAt": "2016-07-23T14:26:16.000Z"
        },
        {
            "createdAt": "2016-07-23T14:26:16.000Z",
            "id": 2,
            "name": "Cats",
            "updatedAt": "2016-07-23T14:26:16.000Z"
        }
      ], done);
  });
});
