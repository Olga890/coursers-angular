(function () {
  "use strict";

  angular.module('public')
    .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['MyInfoService', 'MenuService'];
  function MyInfoController(MyInfoService, MenuService) {
    var $ctrl = this;

    $ctrl.data = null;
    $ctrl.menuItem = null;

    MyInfoService.getPreference().then(function(data) {
      if(data) {
        MenuService.getMenuItem(data.menuNumber).then(function(item){
          $ctrl.menuItem = item;
          $ctrl.data = data;
        });
      }
    });
  }
})();
