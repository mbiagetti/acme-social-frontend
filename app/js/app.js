'use strict';

var acmeSocialApp = angular.module('acmeSocialApp', ['infinite-scroll','ngRoute','acmeSocialControllers']);

acmeSocialApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'app/view/home.html',
                controller: 'HomeController'
            }).
            when('/authors', {
                templateUrl: 'app/view/author.html',
                controller: 'AuthorController'
            }).
            when('/authors/:authorId', {
                templateUrl: 'app/view/author-detail.html',
                controller: 'AuthorDetailController'
            }).
            when('/tags/:tagId', {
                templateUrl: 'app/view/tag-detail.html',
                controller: 'TagDetailController'
            }).
            when('/404', {
                templateUrl: 'app/view/not-found.html',
                controller: 'NotFoundController'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);

