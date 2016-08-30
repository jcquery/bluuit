'use strict';

// eslint-disable-next-line max-statements
(function() {
  const app = angular.module('bluuitApp');

  app.controller('topicController', topicController);
  app.controller('postController', postController);
  app.controller('RegCtrl', RegCtrl);
  app.controller('AuthCtrl', AuthCtrl);
  app.controller('LoginCtrl', LoginCtrl);
  app.controller('ModalCtrl', ModalCtrl);
  app.controller('NavCtrl', NavCtrl);

  topicController.$inject = ['topicsSvc', 'sortSvc', '$scope'];
  postController.$inject = ['postsSvc'];
  RegCtrl.$inject = ['regSvc', '$location'];
  AuthCtrl.$inject = ['auth', '$location'];
  LoginCtrl.$inject = ['$cookies', 'auth'];
  ModalCtrl.$inject = ['$scope', '$rootScope', '$location'];
  NavCtrl.$inject = ['sortSvc', 'topicsSvc'];

  function topicController(topicsSvc, sortSvc, $scope) {
    this.mainList = topicsSvc.returnMainList;
    this.newTopic = {};
    this.sortBy = sortSvc.returnTopics;
    this.postSortBy = sortSvc.returnPosts;

    this.createTopic = () => {
      topicsSvc.postTopic(this.newTopic)
        .then((res) => {
          this.topicList.push(res.data);
          this.newTopic = {};
        })
        .catch((err) => {
          throw err;
        });
    };

    this.removeSpace = (topicName) => {
      return topicName.replace(/\s+/g, '');
    };

    const activate = () => {

      topicsSvc.getTopics();
    };
    activate();
  }

  function postController(postsSvc) {
    this.postList = [];
    this.newPost = {};
    this.currentId = -1;

    const activate = () => {
      postsSvc.getPosts()
        .then((posts) => {
          this.postList = posts.data;
        })
        .catch((err) => {
          throw err;
        });
    };

    // const convertTimestamps = (post) => {
    //   post.createdAt = new Date(post.createdAt).getTime();
    //   post.updatedAt = new Date(post.updatedAt).getTime();
    //
    //   return post;
    // }
    // map posts array with convert timestamps
    // also, make sure created posts use new time mechanism

    this.getPosts = (id) => {
      return this.postList.filter((post) => {
        return post.topicId === id;
      });
    };

    this.initPosts = () => {
      $('.collapsible').collapsible();
      $('.modal-trigger').leanModal();
    };

    this.openPost = (id) => {
      this.newPost = {};
      this.currentId = id;
      $('#newpostmodal').openModal();
    };

    this.postNewPost = (id) => {
      postsSvc.postPost(id, this.newPost)
        .then((res) => {
          this.postList.push(res.data[0])
          this.newPost = {}
          this.currentId = -1;
          $('.collapsible').collapsible();
          $('.modal-trigger').leanModal();
        })
        .catch((err) => {
          throw err;
        });
    };

    this.upvote = (post) => {
      postsSvc.updatePost(post.id, 1)
        .then(() => {
          for (const listPost of this.postList) {
            if (listPost.id === post.id) {
              listPost.rating += 1;

              return;
            }
          }
        });
    };

    this.downvote = (post) => {
      postsSvc.updatePost(post.id, 0)
        .then(() => {
          for (const listPost of this.postList) {
            if (listPost.id === post.id) {
              listPost.rating -= 1;

              return;
            }
          }
        });
    };
    activate();
    $('.collapsible').collapsible();
    $('.modal-trigger').leanModal();
  }

  function RegCtrl(regSvc, $location) {
    this.newUser = {};

    this.createUser = () => {
      regSvc.postUser(this.newUser)
        .then((res) => {
          this.newUser = {};
          Materialize.toast(`You bluuit,  ${res.config.data.username}! Go ahead and log in!`, 4000);
          $location.path('/login');
        })
        .catch((err) => {
          Materialize.toast('Invalid username.', 4000);
          throw err;
        });
    };
  }

  function AuthCtrl(auth, $location) {
    this.user = {};

    this.login = () => {
      auth.login(this.user.username, this.user.password)
        .then(() => {
          $location.path('/')
          this.user = {};
          Materialize.toast('Welcome!', 4000);
        })
        .catch((err) => {
          Materialize.toast('Login Failed.', 4000);
          throw err;
        });
    };
  }

  function LoginCtrl($cookies, auth) {
    this.isLoggedIn = () => {
      return $cookies.get('loggedIn');
    };

    this.logout = () => {
      auth.logout();
      Materialize.toast('Goodbye!', 4000);
    };
  }

  function ModalCtrl($scope, $rootScope, $location) {
    $rootScope.$on('$locationChangeStart', (event, next, _current) => {
      $('#newpostmodal').closeModal();
      $('#newTopic').closeModal();
    });
  }

  function NavCtrl(sortSvc, topicsSvc) {
    this.sortBy = '';
    this.newTopic = {};

    this.updatePosts = (radio) => {
      sortSvc.updatePosts(radio);
    };

    this.updateSort = () => {
      sortSvc.updateTopics(this.sortBy);
    };

    this.createTopic = () => {
      topicsSvc.postTopic(this.newTopic);
      this.newTopic = {};
    };
  }
})();
