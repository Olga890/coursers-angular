(function() {
  "use strict";

  angular.module('common')
    .service('MyInfoService', MyInfoService);

  MyInfoService.$inject = [];
  function MyInfoService() {
    var service = this,
      _preference = null;

    service.savePreference = function(data){
      return new Promise(function(resolve, reject) {
        _preference = data;
        resolve(true);
      });
    };

    service.getPreference = function(){
      return new Promise(function(resolve, reject) {
        resolve(_preference);
      });
    };
  }
})();
