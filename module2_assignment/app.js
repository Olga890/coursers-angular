(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
  function ToBuyController($scope, ShoppingListCheckOffService) {
    $scope.toBuy = ShoppingListCheckOffService.toBuy;
    $scope.buy = function(item){
      ShoppingListCheckOffService.buy(item);
    };

  }

  AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
  function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
    $scope.bought = ShoppingListCheckOffService.bought;
  }

  function ShoppingListCheckOffService() {
    var self = this;

    self.toBuy = [
      { name: "snickers", quantity: 2 },
      { name: "skittles", quantity: 5 },
      { name: "kitkat", quantity: 10 },
      { name: "twix", quantity: 15 },
      { name: "hershey", quantity: 20 }
    ];
    self.bought = [];

    self.buy = function(item){
      var index = self.toBuy.indexOf(item);
      self.toBuy.splice(index, 1);

      self.bought.push(item);
    };
  }
})();
