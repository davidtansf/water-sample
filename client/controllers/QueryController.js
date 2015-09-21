angular.module('water.querycontroller', [])

.controller('QueryController', ['$scope', '$http', function($scope, $http) {
  $scope.getSample = function(id, callback) {
    console.log($scope.sample_id);
    $http({
      url: '/sample',
      method: 'GET',
      params: { 'id' : $scope.sample_id }
    })
    .success(function(data){
      console.log(data);
      $scope.displaySample(data);
    });
  };

  $scope.displaySample = function(data) {
    var $results = [];
    if (data) {
      _.each(data, function(value, key) {

        $whole = $('<p></p>').text(key + ": " + value);
        $results.push($whole);
      });
    } else {
      $whole = $('<p></p>').text("id: " + null);
      $results.push($whole);
    }
    console.log($results);
    $('#holder').attr('id','sample');
    $('#sample').find('ul').html($results);

  };
}]);
