'use strict';
(function() {
   angular.module('bluuitApp', ['ngRoute', 'ngCookies']);
   $(document).ready(function(){
     $('select').material_select();
     $('.button-collapse').sideNav();
     $('.modal-trigger').leanModal();
   });
})();
