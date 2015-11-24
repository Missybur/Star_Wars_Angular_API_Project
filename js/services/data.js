"use strict";

var myapp = angular.module('myapp', ["ui.router"])

myapp.service("$stateParams", function($http){

  this.getPlanets = function(callback){
    $http.get("http://swapi.co/api/planets/?format=json").then(callback)
  };
})
