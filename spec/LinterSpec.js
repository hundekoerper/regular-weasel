xdescribe('compareProperties', function() {
  var compareProperties
  ,   database
  ,   profile;

  beforeEach(function() {
    compareProperties = require('../lib/compareProperties');
    database = require('../node_modules/caniuse-db/data.json');
    profile = require('./profile.json');
  });

  it('should do stuff', function() {
    var test;
    expect(compareProperties(test, database, profile));
  });

});
