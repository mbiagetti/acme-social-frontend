var acmeSocialControllers = angular.module('acmeSocialControllers', []);

acmeSocialControllers.controller('HomeController',
    ['$scope','ENDPOINT', 'AcmeSocialPaginator', 'Page',
        function($scope, ENDPOINT, AcmeSocialPaginator, Page) {
            Page.setTitle("Post Lists");
            Page.setQuery("");
            $scope.social = new AcmeSocialPaginator(ENDPOINT.POSTS , "posts");

}]);

acmeSocialControllers.controller('AuthorController',
    ['$scope', 'ENDPOINT', 'AcmeSocialPaginator', 'Page',
        function($scope, ENDPOINT, AcmeSocialPaginator, Page) {
            Page.setTitle("Author Lists");
            Page.setQuery("");
            $scope.author = new AcmeSocialPaginator(ENDPOINT.AUTHORS, "authors");
}]);

acmeSocialControllers.controller('NotFoundController',
    ['$scope',
        function($scope) {
            $scope.error = "The requested resources was not found";
}]);

acmeSocialControllers.controller('AuthorDetailController',
    ['$scope', 'ENDPOINT', '$location', '$routeParams','$http', 'AcmeSocialPaginator', 'Page',
        function($scope, ENDPOINT, $location, $routeParams, $http,  AcmeSocialPaginator, Page) {
            var url = ENDPOINT.AUTHORS+"/"+$routeParams.authorId;
            $http.get(url)
                .success(function(data) {
                    $scope.authorDetail = data;
                    var a = data.links.filter(function (el) {
                        return el.rel == 'posts';
                    });
                    var link = a[0].href; // posts api link
                    Page.setTitle(data.name);
                    Page.setQuery("");
                    $scope.authorPosts = new AcmeSocialPaginator(link, "posts");
                    // force loading...
                    $scope.authorPosts.nextPage();
                }).error(function(data, status, headers, config) {
                    $location.url('/404');
                });
}]);

acmeSocialControllers.controller('TagDetailController',
    ['$scope', 'ENDPOINT', '$location', '$routeParams','$http', 'AcmeSocialPaginator', 'Page',
        function($scope, ENDPOINT, $location, $routeParams, $http,  AcmeSocialPaginator, Page) {
            var url = ENDPOINT.TAGS+"/"+$routeParams.tagId;
            $http.get(url)
                .success(function(data) {
                    $scope.tagDetail = data;
                    var a = data.links.filter(function (el) {
                        return el.rel == 'posts';
                    });
                    var link = a[0].href; // posts api link
                    Page.setTitle("Tag: "+ data.name);
                    Page.setQuery("");
                    $scope.tagPosts = new AcmeSocialPaginator(link, "posts");
                    // force loading...
                    $scope.tagPosts.nextPage();
                }).error(function(data, status, headers, config) {
                    $location.url('/404');
                });
        }]);


acmeSocialControllers.controller('MainController',
    ['$scope','Page',
        function($scope, Page) {
            $scope.Page = Page;
        }]);
