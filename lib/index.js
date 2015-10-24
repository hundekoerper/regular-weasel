var database = require("../node_modules/caniuse-db/data.json")
,   readProperties = require ("./readProperties")
,   compareProperties = require ("./compareProperties");

function weasel(profile, contents) {

  compareProperties(readProperties(contents), database, profile);

};

module.exports = weasel;