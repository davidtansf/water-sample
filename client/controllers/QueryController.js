angular.module('water.querycontroller', [])

.controller('QueryController', ['$scope', '$http', function($scope, $http) {
  $scope.data = {};
  $scope.getSample = function(id, callback) {
    console.log($scope.sample_id);
    $http({
      url: '/sample',
      method: 'GET',
      params: { 'id' : $scope.sample_id }
    })
    .success(function(data){
      $scope.data = data;
      console.log(data);
      $scope.displaySample(data);
    });
  };

  $scope.displaySample = function(data, flag) {
    var $results = [];
    console.log(data);
    if (data) {
      _.each(data, function(value, key) {

        $whole = $('<p></p>').text(key + ": " + value);
        $results.push($whole);
      });
    } else {
      $whole = $('<p></p>').text("id: " + null);
      $results.push($whole);
    }
    if (!flag) {
      $factorbtn = $('<form class="factorsubmit"> \
          <div id="factorbutton"><input id="factorButton" \
          type="submit" value="Get Factor"></div></form>');
      $results.push($factorbtn);
    }
    console.log($results);
    $('#holder').attr('id','sample');
    $('#sample').find('ul').html($results);
    $(".factorsubmit").on('submit',function(event) {
      event.preventDefault();
      $scope.displaySample($scope.to_hash($scope.data, true), true);
    });
  };

  $scope.to_hash = function(data, flag) {
    var obj;

    $scope.toHashAll().then(function(factors) {
      console.log(factors);
      var obj = _.mapObject(data, _.identity);

      _.each(factors, function(scheme) {
        var factorkey = 'factor_' + scheme.id;
        obj[factorkey] = $scope.calcFactor(data, scheme);
      });

      console.log(obj);

    });

    return obj;

  };

  $scope.toHashAll = function(callback) {
    return $http({
      url: '/hash',
      method: 'GET'
    })
    .then(function(results){
        return results.data;
    });
  };

  $scope.calcFactor = function(sample, model) {
    var factor = 0;
    factor += sample.chloroform * model.chloroform_weight;
    factor += sample.bromoform * model.bromoform_weight;
    factor += sample.bromodichloromethane * model.bromodichloromethane_weight;
    factor += sample.dibromichloromethane * model.dibromichloromethane_weight;
    factor = Number(math.format(factor, {precision: 14}));
    return factor;
  };
}]);
