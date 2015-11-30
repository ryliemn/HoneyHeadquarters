var honeyHeadquartersApp = angular.module('honeyHeadquartersApp', []);

honeyHeadquartersApp.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}]);

honeyHeadquartersApp.controller('CitizensCtrl', function ($scope, $http) {
  $scope.sort_key = "";
  $scope.character_key = "";
  $scope.size_key = "";
  $scope.hometown_key = "";
  $scope.showing_large_picture = false;
  $scope.large_picture_url = "";

  $scope.is_loading = true;

  $scope.populate_character_select = function() {
    $http({
      method: 'GET',
      url: '/character'
    }).then(function successCallback(response) {
      $scope.characters = response.data;
      $scope.characters.push('All');
    }, function errorCallback(response) {
      console.log("could not get characters");
    });
  }

  $scope.populate_size_select = function() {
    $http({
      method: 'GET',
      url: '/size'
    }).then(function successCallback(response) {
      $scope.sizes = response.data;
      $scope.sizes.push('All');
    }, function errorCallback(response) {
      console.log("could not get sizes");
    });
  }

  $scope.populate_hometown_select = function() {
    $http({
      method: 'GET',
      url: '/hometown'
    }).then(function successCallback(response) {
      $scope.hometowns = response.data;
      $scope.hometowns.push('All');
    }, function errorCallback(response) {
      console.log("could not get hometowns");
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

    if ($scope.size_key !== "") {
      queries.push('size=' + $scope.size_key);
    }

    if ($scope.hometown_key !== "") {
      queries.push('hometown=' + $scope.hometown_key);
    }

    for (var i = 0; i < queries.length; i++) {
      url += queries[i];
      url += '&';
    }
    console.log(url);
    return url;
  }

  $scope.new_query = function() {
    $scope.is_loading = true;
    var new_url = $scope.new_query_url();

    $http({
      method: 'GET',
      url: new_url
    }).then(function successCallback(response) {
      $scope.citizens = response.data;
      $scope.is_loading = false;
    }, function errorCallback(response) {
      console.log("could not retrieve citizens");
    });
  }

  $scope.show_large_picture = function(image_url) {
    $scope.large_picture_url = image_url;
    $scope.showing_large_picture = true;
    console.log(image_url);
    console.log($scope.showing_large_picture);
  }

  $scope.new_query();
  $scope.populate_character_select();
  $scope.populate_size_select();
  $scope.populate_hometown_select();
});
