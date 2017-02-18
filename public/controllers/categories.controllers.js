angular.module('myApp')
    .controller('CategoriesCtrl', ['$http', '$scope', function($http, $scope) {
        $http.get('/categories').then(function(response) {
            $scope.categories = response.data;
        });
    }]);