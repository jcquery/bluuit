'use strict';

exports.seed = function(knex) {
  return knex('posts').del()
    .then(() => {
      return knex('posts').insert([{
        id: 1,
        title: "Dogs Are Not Allowed On NYC Subway Unless They're In A Carrier… So This Happened",
        image_url: "https://b.thumbs.redditmedia.com/WTeAOJlQ98AfIVn7BjV_cDrDLXMuowwmJVo1p1xX5yg.jpg",
        description: "What an awesome story.",
        rating: 0,
        user_id: 1,
        topic_id: 1,
        created_at: new Date('2016-07-23 14:26:16 UTC'),
        updated_at: new Date('2016-07-23 14:26:16 UTC')
      },
      {
        id: 2,
        title: "Wagging That Tail",
        image_url: "https://a.thumbs.redditmedia.com/pl1fM2jukfU2xW6hamMUF5dJ5gC_igj-1Z2oMwQM_90.jpg",
        description: "What an awesome story.",
        rating: 0,
        user_id: 1,
        topic_id: 1,
        created_at: new Date('2016-07-23 14:26:16 UTC'),
        updated_at: new Date('2016-07-23 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts));"
      );
    });
};
