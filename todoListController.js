/* global angular */
(function() {
  'use strict';
  var app = angular.module('todoList', ['LocalStorageModule']);

  function todoListController($scope, localStorageService) {
    var vm = this;
    vm.todoLists = localStorageService.get('myLocalStorage') || [];

    vm.addActivity = function() {
      vm.todoLists.push(vm.newActivity);
      vm.newActivity = {};
    };

    $scope.$watchCollection(function() {
      return vm.todoLists;
    }, function(newValue, oldValue) {
      // esta función se lanza cada vez que se modifica vm.todoLists
      localStorageService.set('myLocalStorage', vm.todoLists);
    });

    vm.cleanStorage = function() {
      vm.todoLists = [];
      vm.newActivity = {};
    };
  }

  app.controller('TodoListController', todoListController);
}());
