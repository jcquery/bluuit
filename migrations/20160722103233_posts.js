'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('image_url').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.integer('rating').notNullable().defaultTo(0);
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.integer('topic_id')
      .notNullable()
      .references('id')
      .inTable('topics')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
