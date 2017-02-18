var app = angular.module('myApp');
app.directive('ckEditor', function() {
    return {
        require: '?ngModel',
        link: function(scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0]);
            if (!ngModel) return;
            ck.on('instanceReady', function() {
                ck.setData(ngModel.$viewValue);
            });

            function updateModel() {
                scope.$apply(function() {
                    ngModel.$setViewValue(ck.getData());
                });
            }
            ck.on('change', updateModel);
            ck.on('key', updateModel);
            ck.on('dataReady', updateModel);

            ngModel.$render = function(value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
});

app.controller('ArticlesCtrl', function($http, $scope, $routeParams, $location) {
    $http.get('/articles').then(function(response) {
        $scope.articles = response.data;
    });
    $scope.removeArticle = function(article) {
        var id = article._id;
        console.log('Id cua bai viet la ' + id);
        $http.delete('/articles/' + id).then(function(response) {
            console.log("Xoa thanh cong");
        });
        $location.path('/articles');
    }
});
app.controller('ArticlesCategoryCtrl', function($http, $scope, $routeParams) {
    $http.get('/articles/category/' + $routeParams.category).then(function(response) {
        $scope.cat_articles = response.data;

        $scope.category = $routeParams.category;
    });
});
app.controller('ArticleDetailsCtrl', function($http, $scope, $routeParams) {
    $http.get('/articles/' + $routeParams.id).then(function(response) {
        $scope.detail_article = response.data;

    });
});
app.controller('ArticleCreateCtrl', function($http, $scope, $location) {
    $http.get('/categories').then(function(response) {
        $scope.categories = response.data;
    });
    $scope.addArticle = function() {
        var data = {
            title: $scope.title,
            body: $scope.body,
            category: $scope.category,
            date: new Date()
        }
        $http.post('/articles', data).then(function(response, status) {
            $scope.msgbox = true;
            $scope.msg = "Article added";
        });
        $location.path('/articles');
    }
});
app.controller('ArticleEditCtrl', function($location, $scope, $http, $routeParams) {
    $http.get('/categories').then(function(response) {
        $scope.categories = response.data;
    });
    $http.get('/articles/' + $routeParams.id).then(function(response1) {
        $scope.article = response1.data;
        console.log($scope.article);
    });
    $scope.addArticle = function() {
        var data = {
            id: $routeParams.id,
            title: $scope.article.title,
            body: $scope.article.body,
            category: $scope.article.category,
            date: new Date()
        }
        $http.put('/articles', data).then(function(response) {
            console.log("Update successful");
            $location.path('/articles');
        })
    }
});