// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('doh2015', 
  [ 
  'ionic',
  'ionic.contrib.ui.tinderCards', 
  'doh2015.controllers.login', 
  'doh2015.controllers.recipes'])


.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html"
        }
      }
    })
    .state('app.home', {
      url: "/home",
        views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    })
    .state('app.overview', {
      url: "/overview",
        views: {
        'menuContent' :{
          templateUrl: "templates/overview.html"
        }
      }
    })

   $urlRouterProvider.otherwise("/app/login");

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
