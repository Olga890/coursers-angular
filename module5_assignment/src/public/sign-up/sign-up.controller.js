(function() {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MyInfoService', 'MenuService'];
  function SignUpController(MyInfoService, MenuService) {
    var $ctrl = this,
      validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      };

    $ctrl.firstName = '';
    $ctrl.lastName = '';
    $ctrl.email = '';
    $ctrl.phoneNumber = '';
    $ctrl.menuNumber = '';
    $ctrl.error = '';

    $ctrl.signUp = function() {
      MenuService.getMenuItem($ctrl.menuNumber).then(function(data){
        if (!data || data.error) {
          $ctrl.error = 'No such menu number exists';
        } else {
          MyInfoService.savePreference({
            firstName: $ctrl.firstName,
            lastName: $ctrl.lastName,
            email: $ctrl.email,
            phoneNumber: $ctrl.phoneNumber,
            menuNumber: $ctrl.menuNumber
          }).then(function(saved){
            if(saved) {
              $ctrl.info = 'Your information has been saved';
            } else {
              $ctrl.error = 'ERROR: Your information has not been saved';
            }
          });
        }
      });
    };

    $ctrl.valid = function() {
      return $ctrl.firstName !== '' &&
        $ctrl.lastName !== '' &&
        validateEmail($ctrl.email) &&
        $ctrl.phoneNumber !== '' &&
        $ctrl.menuNumber !== '';
    };
  }
})();
