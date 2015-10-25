var database = require("../node_modules/caniuse-db/data.json")
,   readProperties = require ("./readProperties")
,   compareProperties = require ("./compareProperties");

function weasel(profile, contents) {
  return compareProperties(readProperties(contents), database, profile);
};

module.exports = weasel;