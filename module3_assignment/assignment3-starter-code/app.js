(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;

    ctrl.found = [];
    ctrl.searchTerm = '';
    ctrl.showNothingFound = false;
    ctrl.narrowIt = function() {
      if(ctrl.searchTerm) {
        MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
          .then(function(data) {
            ctrl.showNothingFound = data.length == 0;
            ctrl.found = data;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        ctrl.found = [];
        ctrl.showNothingFound = true;
      }
    };
    ctrl.removeItem = function(index){
      ctrl.found.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function(result){
        return result.data.menu_items.filter(function(item){
          return item.description.indexOf(searchTerm) >= 0;
        });
      });
    };
  }

  function FoundItemsDirective() {
    return {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controllerAs: 'list'
    };
  }
})();
