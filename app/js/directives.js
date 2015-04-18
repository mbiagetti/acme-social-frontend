
acmeSocialApp.directive('socialPost', function() {
    return {
        templateUrl: 'app/partials/post.html'
    };
});

acmeSocialApp.directive('socialPostWithoutAuthor', function() {
    return {
        templateUrl: 'app/partials/post-no-author.html'
    };
});

acmeSocialApp.directive('socialAuthor', function() {
    return {
        templateUrl: 'app/partials/author.html'
    };
});