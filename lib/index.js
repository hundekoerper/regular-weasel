var database = require('../node_modules/caniuse-db/data.json')
,   readProperties = require ('./readProperties')
,   Linter = require('./Linter');

function weasel(profile, contents) {
  var linter = new Linter(readProperties(contents), database, profile);
  return linter.run();
};

module.exports = weasel;
