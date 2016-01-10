var honeyHeadquartersApp = angular.module('honeyHeadquartersApp', []);

honeyHeadquartersApp.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}]);

honeyHeadquartersApp.filter('startFrom', function() {
  return function(input, start) {
    if(input) {
      start = +start;
      return input.slice(start);
    }
    return [];
  }
});

honeyHeadquartersApp.controller('CitizensCtrl', function ($scope, $http) {
  $scope.citizens = [];
  $scope.characters = [];
  $scope.sizes = [];
  $scope.hometowns = [];

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
    $scope.characters.push('All');
    for (var i = 0; i < $scope.citizens.length; i++) {
      if (!$scope.characters.includes($scope.citizens[i].character)) {
        $scope.characters.push($scope.citizens[i].character);
      }
    }
    $scope.count_characters($scope.characters)
  }

  $scope.populate_size_select = function() {
    $scope.sizes.push('All');
    for (var i = 0; i < $scope.citizens.length; i++) {
      if (!$scope.sizes.includes($scope.citizens[i].size)) {
        $scope.sizes.push($scope.citizens[i].size);
      }
    }
  }

  $scope.populate_hometown_select = function() {
    $scope.hometowns.push('All');
    for (var i = 0; i < $scope.citizens.length; i++) {
      if (!$scope.hometowns.includes($scope.citizens[i].hometown)) {
        $scope.hometowns.push($scope.citizens[i].hometown);
      }
    }
  }

  $scope.new_query = function(callbacks) {
    $scope.is_loading = true;
    var new_url = '/citizen?';

    $http({
      method: 'GET',
      url: new_url
    }).then(function successCallback(response) {
      $scope.citizens = response.data;
      $scope.filteredCitizens = $scope.citizens;
      $scope.is_loading = false;
      if (callbacks) {
        for (var i = 0; i < callbacks.length; i++) {
          callbacks[i]();
        }
      }
    }, function errorCallback(response) {
      console.log("could not retrieve citizens");
    });
  }

  $scope.show_large_picture = function(image_url) {
    $scope.large_picture_url = image_url;
    $scope.showing_large_picture = true;
  }

  $scope.count_characters = function(chars) {
    $scope.population = $scope.citizens.length;

    var counts = {};
    for (var i = 0; i < chars.length; i++) {
      if (chars[i] !== 'All') {
        counts[chars[i]] = 0;
      }
    }

    for (var i = 0; i < $scope.citizens.length; i++) {
      counts[$scope.citizens[i]['character']] += 1;
    }

    $scope.citizen_counts = counts;

    $scope.is_first_load = false;
  }

  $scope.set_page = function(new_page) {
    $scope.current_page = new_page;
  }

  $scope.get_pages = function() {
    if ($scope.filteredCitizens) {
      num_of_pages = Math.ceil($scope.filteredCitizens.length / 10);
      pages = {};
      for (var i = 0; i < num_of_pages; i++) {
        pages[i + 1] = i;
      }
      return pages;
    } else {
      return {};
    }
  }

  $scope.new_query([$scope.populate_character_select,
    $scope.populate_size_select,
    $scope.populate_hometown_select]);
});
