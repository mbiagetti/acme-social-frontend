var acmeSocialControllers = angular.module('acmeSocialControllers', []);


acmeSocialControllers.controller('HomeController',['$scope', 'AcmeSocialPaginator',  function($scope, AcmeSocialPaginator) {
    $scope.social = new AcmeSocialPaginator(baseTweetUrl ,"posts");
}]);

acmeSocialControllers.controller('AuthorController',['$scope', 'AcmeSocialPaginator',  function($scope, AcmeSocialPaginator) {
    $scope.author = new AcmeSocialPaginator(baseAuthorUrl,"authors");
}]);

acmeSocialControllers.controller('NotFoundController',['$scope',  function($scope) {
    $scope.error = "The requested resources was not found";
}]);

acmeSocialControllers.controller('AuthorDetailController',['$scope', '$location', '$routeParams','$http', 'AcmeSocialPaginator',  function($scope, $location, $routeParams, $http,  AcmeSocialPaginator) {

    var url = baseAuthorUrl+"/"+$routeParams.authorId;

        $http.get(url).success(function(data) {
            $scope.authorDetail = data;
            $scope.authorPosts = new AcmeSocialPaginator(data._links.posts, "posts");
            // force loading...
            $scope.authorPosts.nextPage();

        }) .error(function(data, status, headers, config) {
                $location.url('/404');
            });

}]);
