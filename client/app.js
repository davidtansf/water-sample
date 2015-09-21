
var app, WaterSample, a;
$(function() {
  app = {

    init: function() {
      $(".submit").on('submit',function(event) {
        event.preventDefault();
        var id = $(".input").val();
        if (id) {
          a = new WaterSample(id);
        }
       $(".input").val("");
      });
      app.fetch();
    },

    fetch: function() {
      $.ajax('http://localhost:3000/data', {
        contentType: 'application/json',
        type: 'GET',
        success: function(data){
          app.displayData(data);
        },
        error: function(data) {
          throw new Error('Error: Did not fetch data');
        }
      });
    },

    displayData: function(data) {
      var $results = [];
      data = JSON.parse(data);
      _.each(data.results, function(sample) {
        $whole = $('<p></p>').text(sample.id + " " + sample.site);
        $results.push($whole);
      });
      $('#main').find('ul').html($results);
    },

    displaySample: function(data) {
      var $results = [];
      _.each(data, function(value, key) {
        $whole = $('<p></p>').text(key + ": " + value);
        $results.push($whole);
      });
      $('#holder').attr('id','sample');
      $('#sample').find('ul').html($results);
    },

    getSample: function(id, callback) {
      $.ajax({
        url: 'http://localhost:3000/sample',
        contentType: 'application/json',
        type: 'GET',
        data: { 'id' : id },
        success: function(data){
          callback(data);
        },
        error: function(data){
          throw new Error('getSample Error!');
        }
      });
    },

    getFactor: function(id, callback) {
      var factor;
      $.ajax({
        async: false,
        url: 'http://localhost:3000/factor',
        contentType: 'application/json',
        type: 'GET',
        data: {'id' : id },
        success: function(data){
          factor = callback(data);
        },
        error: function(data){
          throw new Error('getFactor Error!');
        }
      });
      return factor;
    },

    toHashAll: function(callback) {
      var obj;
      $.ajax({
        async: false,
        url: 'http://localhost:3000/hash',
        contentType: 'application/json',
        type: 'GET',
        success: function(data){
          obj = callback(JSON.parse(data));
        },
        error: function(data){
          throw new Error('toHashAll Error!');
        }
      });
      return obj;
    }
  };

  WaterSample = function(id) {
    var find = function(id) {
      app.getSample(id, function(data) {
        if (data) {
          data = JSON.parse(data);
          this.id = data.id;
          this.site = data.site;
          this.chloroform = data.chloroform;
          this.bromoform = data.bromoform;
          this.bromodichloromethane = data.bromodichloromethane;
          this.dibromichloromethane = data.dibromichloromethane;
        } else {
          this.id = null;
        }
        app.displaySample(this);
      }.bind(this));
    }.bind(this);

    find(id);

  };

  WaterSample.prototype.factor = function(factor_id) {

    return app.getFactor(factor_id, function(scheme) {
      if (scheme) {
        return this.calcFactor(this, JSON.parse(scheme));
      }
      return null;
    }.bind(this));

  };

  WaterSample.prototype.to_hash = function(flag) {
    if (!flag) {
      return _.mapObject(this, _.identity);
    } else {
      return app.toHashAll(function(data) {
        var obj = _.mapObject(this, _.identity);

        _.each(data, function(scheme) {
          var factorkey = 'factor_' + scheme.id;
          obj[factorkey] = this.calcFactor(this, scheme);
        }.bind(this));

        return obj;

      }.bind(this));
    }
  };

  WaterSample.prototype.calcFactor = function(sample, model) {
    var factor = 0;
    factor += sample.chloroform * model.chloroform_weight;
    factor += sample.bromoform * model.bromoform_weight;
    factor += sample.bromodichloromethane * model.bromodichloromethane_weight;
    factor += sample.dibromichloromethane * model.dibromichloromethane_weight;
    factor = Number(math.format(factor, {precision: 14}));
    return factor;
  };

}());
