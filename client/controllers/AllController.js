angular.module('water.allcontroller', [])

.controller('AllController', ['$scope', '$http', function($scope, $http) {
  $scope.data = {};
  $scope.getSamples = function() {
    $http({
      method: 'GET',
      url: '/data',
    })
    .success(function(resp) {
      $scope.data = resp.results;
      $scope.displayData(resp.results);
    });
  };
  $scope.displayData = function(data) {
      var $results = [];
      _.each(data, function(sample) {
        $whole = $('<p></p>').text(sample.id + " " + sample.site);
        $results.push($whole);
      });
      $('#main').find('ul').html($results);
  };
}]);

