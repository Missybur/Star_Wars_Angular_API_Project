   "use strict";


var myapp = angular.module('myapp', ["ui.router", "services"])


myapp.controller("ResidentCtrl", ['$scope', '$http', '$stateParams', 'getAndStoreCharacter' , function($scope, $http, $stateParams, getAndStoreCharacter) {
  var url = ("http://swapi.co/api/people/" + $stateParams.id + "/?format=json")
    getAndStoreCharacter.getCharacter(url);
}]);



myapp.controller("PlanetCtrl", [ '$scope', '$http', 'getAndStoreCharacter', function($scope, $http, getAndStoreCharacter) {

  $scope.planets = [];
  $http.get("http://swapi.co/api/planets/?format=json").then(resp => {
    $scope.planets = resp.data.results.map(planet => {
      planet.residents = planet.residents.map(resident => {
        var resident = { url: resident };
        resident.id = resident.url.match(/\d+/)[0];
        var charNames = getAndStoreCharacter.characterNames
          if(charNames){
            charNames.forEach(function(input){
              if (resident.url === input.charUrl){
                resident.name = input.charName;
                console.log(resident)
              }
            })
          }
        return resident;
      })
      return planet;
    })

  }).catch(error => console.error(error.status));
}]);


myapp.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/planets")

    $stateProvider
    .state('planets', {
      url: "/planets",
      templateUrl: "planets.html",
      controller: "PlanetCtrl"
    })
  .state('resident', {
    url: "/resident/:id",
    templateUrl: "resident.html",
    controller: "ResidentCtrl"
  })
});





  //  var myapp = angular.module('myapp', ["ui.router"])

  //  myapp.controller("ResidentCtrl", function($scope, $http, $stateParams) {
  //   $http.get("http://swapi.co/api/people/" + $stateParams.id + "/?format=json").then(resp => {
  //     $scope.character = resp.data;
  //   });

  //   $scope.savePlanet = function(id) {
  //     stateParams.savePlanet(id)
  //   }

  // })
  //  myapp.controller("PlanetCtrl", function($scope, $http) {
  //   $scope.planets = [];
  //   $http.get("http://swapi.co/api/planets/?format=json").then(resp => {
  //     $scope.planets = resp.data.results.map(planet => {
  //       planet.residents = planet.residents.map(resident => {
  //         var resident = { url: resident };
  //         resident.id = resident.url.match(/\d+/)[0];
  //         return resident;
  //       });
  //       return planet;
  //     });

  //   }).catch(error => console.error(error.status));
  // });
  //  myapp.config(function($stateProvider, $urlRouterProvider){

  //   $urlRouterProvider.otherwise("/planets")

  //   $stateProvider
  //   .state('planets', {
  //     url: "/planets",
  //     templateUrl: "planets.html",
  //     controller: "PlanetCtrl"
  //   })
  //   .state('resident', {
  //     url: "/resident/:id",
  //     templateUrl: "resident.html",
  //     controller: "ResidentCtrl"
  //   })
  // })