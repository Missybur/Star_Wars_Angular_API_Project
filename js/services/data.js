"use strict";

var app = angular.module('services', [])

app.service('getAndStoreCharacter', ['$http', function($http){
  var characterNames = [];
  this.getCharacter = function(url){
    console.log('')
    $http.get(url).then(function(data){
      characterNames.push({charUrl : data.data.url , charName : data.data.name})
      console.log(characterNames)
    })
  };
  this.characterNames = characterNames;
}]);

// var myapp = angular.module('myapp', ["ui.router"])

// myapp.service("$stateParams", function($http){

//   this.getPlanets = function(callback){
//     $http.get("http://swapi.co/api/planets/?format=json").then(callback)
//   };
// })
