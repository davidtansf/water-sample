angular.module('water.samplecontroller', [])

.controller('SampleController', ['$scope', '$http', function($scope, $http) {
  $scope.getSample = function(id, callback) {
    console.log($scope.sample_id);
    $http({
      url: '/sample',
      method: 'GET',
      data: { 'id' : $scope.sample_id }
    })
    .success(function(data){
        $scope.displaySample(data.results);
    });
  };

  $scope.displaySample = function(data) {
    var $results = [];
    _.each(data, function(value, key) {
      $whole = $('<p></p>').text(key + ": " + value);
      $results.push($whole);
    });
    $('#holder').attr('id','sample');
    $('#sample').find('ul').html($results);

  };

}]);
