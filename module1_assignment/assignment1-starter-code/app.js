(function() {
  'use strict';

  angular.module('LunchCheck', [])

  .controller('LunchCheckController', ['$scope', function($scope) {
    $scope.name = "";
    $scope.message = "";

    $scope.calculate = function() {
      var len = $scope.name.split(',').filter(function(item){
        return !!item && !!item.trim();
      }).length;
      if(len > 3) {
        $scope.message = 'Too much!';
      } else {
        $scope.message = 'Enjoy!';
      }
    };

  }]);


})();
