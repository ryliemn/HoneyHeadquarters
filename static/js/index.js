var honeyHeadquartersApp = angular.module('honeyHeadquartersApp', []);

honeyHeadquartersApp.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}]);

honeyHeadquartersApp.controller('CitizensCtrl', function ($scope, $http) {
  $scope.sort_key = "";
  $scope.character_key = "";

  $scope.populate_character_select = function() {
    $http({
      method: 'GET',
      url: '/character'
    }).then(function successCallback(response) {
      $scope.characters = response.data;
    }, function errorCallback(response) {
      console.log("could not get characters");
    });
  }

  $scope.new_query_url = function() {
    var url = '/citizen?';

    var queries = []

    if ($scope.sort_key !== "") {
      queries.push('sort=' + $scope.sort_key);
    }

    if ($scope.character_key !== "") {
      queries.push('character=' + $scope.character_key);
    }

    for (var i = 0; i < queries.length; i++) {
      url += queries[i];
      url += '&';
    }
    console.log(url);
    return url;
  }

  $scope.new_query = function() {
    var new_url = $scope.new_query_url();

    $http({
      method: 'GET',
      url: new_url
    }).then(function successCallback(response) {
      $scope.citizens = response.data;
    }, function errorCallback(response) {
      console.log("could not retrieve citizens");
    });
  }

  $scope.new_query();
  $scope.populate_character_select();
});
