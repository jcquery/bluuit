'use strict';

// eslint-disable-next-line max-statements
(function() {
  const app = angular.module('bluuitApp');

  app.factory('topicsSvc', topicsSvc);
  app.factory('postsSvc', postsSvc);
  app.factory('regSvc', regSvc);
  app.factory('auth', auth);
  app.factory('sortSvc', sortSvc);

  topicsSvc.$inject = ['$http'];
  postsSvc.$inject = ['$http'];
  regSvc.$inject = ['$http'];
  auth.$inject =['$http'];

  function topicsSvc($http) {
    let topicsMain = []

    return {
      getTopics: () => {
        topicsMain = [];
        const leftTopicList = [];
        const rightTopicList = [];
        $http.get('/api/topics')
          .then((res) => {
            const topicMaster = res.data;
            for (let i = 0; i < topicMaster.length; i++) {
              if (i % 2 === 0) {
                leftTopicList.push(topicMaster[i]);
              }
              else {
                rightTopicList.push(topicMaster[i]);
              }
            }
            topicsMain.push(leftTopicList);
            topicsMain.push(rightTopicList);
          })
          .catch((err) => {
            throw err;
          });
      },
      postTopic: (topic) => {
        $http.post('/api/topics', {
          name: topic.name
        })
          .then((res) => {
            if (topicsMain[0].length > topicsMain[1].length) {
              topicsMain[1].push(res.data);
            }
            else {
              topicsMain[0].push(res.data);
            }
          })
          .catch((err) => {
            throw err;
          });
      },
      returnMainList: () => {
        return topicsMain;
      }
    };
  };

  function postsSvc($http) {
    return {
      getPosts: () => {
        return $http.get('/api/posts');
      },
      postPost: (id, newPost) => {
        return $http.post('/api/posts', {
          description: newPost.desc,
          title: newPost.title,
          imageUrl: newPost.img,
          topicId: id,
        });
      },
      updatePost: (id, voteDirection) => {
        return $http.patch('/api/posts', {
          id,
          voteDirection
        });
      }
    };
  };

  function regSvc($http) {
    return {
      postUser: (user) => {
        return $http.post('/api/users', {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          password: user.password
        });
      }
    };
  };

  function auth($http) {
    return {
      login: (username, password) => {
        return $http.post('/api/token', { username, password })
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      },
      logout: () => {
        return $http.delete('/api/token')
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      }
    };
  }

  function sortSvc() {
    let topicSort = ''
    let postSort = '-rating'

    return {
      returnTopics: () => {
        return topicSort;
      },
      updateTopics: (update) => {
        topicSort = update;
      },
      returnPosts: () => {
        return postSort;
      },
      updatePosts: (update) => {
        postSort = update;
      }
    };
  }
})();
