'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    title: Joi.string()
      .max(63)
      .label('Title')
      .trim()
      .required(),
    imageUrl: Joi.string()
      .label('Image url')
      .trim()
      .required(),
    description: Joi.string()
      .label('Description')
      .trim()
      .required(),
    topicId: Joi.number()
      .required()
  }
};

module.exports.patch = {
  body: {
    voteDirection: Joi.number()
      .required(),
    id: Joi.number()
      .required()
  }
};
