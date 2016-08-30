'use strict';

exports.seed = function(knex) {
  return knex('topics').del()
    .then(() => {
      return knex('topics').insert([{
        id: 1,
        name: 'Dogs',
        created_at: new Date('2016-07-23 14:26:16 UTC'),
        updated_at: new Date('2016-07-23 14:26:16 UTC')
      },
      {
        id: 2,
        name: 'Cats',
        created_at: new Date('2016-07-23 14:26:16 UTC'),
        updated_at: new Date('2016-07-23 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('topics_id_seq', (SELECT MAX(id) FROM topics));"
      );
    });
};
