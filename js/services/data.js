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
