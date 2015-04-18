var acmeSocialControllers = angular.module('acmeSocialControllers', []);


acmeSocialControllers.controller('HomeController',['$scope','ENDPOINT', 'AcmeSocialPaginator',  function($scope, ENDPOINT, AcmeSocialPaginator) {
    $scope.social = new AcmeSocialPaginator(ENDPOINT.POSTS ,"posts");
}]);

acmeSocialControllers.controller('AuthorController',['$scope', 'ENDPOINT', 'AcmeSocialPaginator',  function($scope, ENDPOINT, AcmeSocialPaginator) {
    $scope.author = new AcmeSocialPaginator(ENDPOINT.AUTHORS,"authors");
}]);

acmeSocialControllers.controller('NotFoundController',['$scope',  function($scope) {
    $scope.error = "The requested resources was not found";
}]);

acmeSocialControllers.controller('AuthorDetailController',['$scope', 'ENDPOINT', '$location', '$routeParams','$http', 'AcmeSocialPaginator',  function($scope, ENDPOINT, $location, $routeParams, $http,  AcmeSocialPaginator) {

    var url = ENDPOINT.AUTHORS+"/"+$routeParams.authorId;

        $http.get(url).success(function(data) {
            $scope.authorDetail = data;

            var a = data.links.filter(function (el) {
                return el.rel == 'posts';
            });
            var link = a[0].href; // posts api link
            $scope.authorPosts = new AcmeSocialPaginator(link, "posts");
            // force loading...
            $scope.authorPosts.nextPage();

        }) .error(function(data, status, headers, config) {
                $location.url('/404');
            });

}]);
