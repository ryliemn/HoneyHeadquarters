var honeyHeadquartersApp = angular.module('honeyHeadquartersApp', []);

honeyHeadquartersApp.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}]);

honeyHeadquartersApp.filter('startFrom', function() {
  return function(input, start) {
    console.log(input);
    if(input) {
      start = +start;
      return input.slice(start);
    }
    return [];
  }
});

honeyHeadquartersApp.controller('CitizensCtrl', function ($scope, $http) {
  $scope.is_first_load = true;

  $scope.sort_key = "";
  $scope.character_key = "";
  $scope.size_key = "";
  $scope.hometown_key = "";
  $scope.showing_large_picture = false;
  $scope.large_picture_url = "";

  $scope.is_loading = true;

  $scope.page_limit = 10;
  $scope.current_page = 0;
  $scope.total_pages = null;
  $scope.start_from = function() {
    return $scope.current_page * 10;
  }

  $scope.populate_character_select = function() {
    $http({
      method: 'GET',
      url: '/character'
    }).then(function successCallback(response) {
      $scope.characters = response.data;
      if ($scope.is_first_load) $scope.count_characters($scope.characters);
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
      $scope.total_pages = Math.ceil($scope.citizens.length / 10);
      $scope.create_pages($scope.total_pages);
    }, function errorCallback(response) {
      console.log("could not retrieve citizens");
    });
  }

  $scope.show_large_picture = function(image_url) {
    $scope.large_picture_url = image_url;
    $scope.showing_large_picture = true;
  }


  $scope.new_query();
  $scope.populate_character_select();
  $scope.populate_size_select();
  $scope.populate_hometown_select();

  $scope.count_characters = function(chars) {
    $scope.population = $scope.citizens.length;

    var counts = {};
    for (var i = 0; i < chars.length; i++) {
      counts[chars[i]] = 0;
    }

    for (var i = 0; i < $scope.citizens.length; i++) {
      counts[$scope.citizens[i]['character']] += 1;
    }

    $scope.citizen_counts = counts;

    $scope.is_first_load = false;
  }

  $scope.create_pages = function(page_count) {
    pages = {};
    for (var i = 0; i < page_count; i++) {
      pages[i + 1] = i;
    }

    $scope.pages = pages;
    $scope.current_page = 0;
  }

  $scope.set_page = function(new_page) {
    $scope.current_page = new_page;
    // console.log($scope.current_page);
    // console.log($scope.start_from());
    // console.log($scope.citizens);
  }
});
