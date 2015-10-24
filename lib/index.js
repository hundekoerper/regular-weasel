var fs = require("fs")
,   database = require("../node_modules/caniuse-db/data.json")
,   readProperties = require ("./readProperties")
,   compareProperties = require ("./compareProperties")
,   chalk = require("chalk");

function weasel(profile) {

  fs.readFile(profile.filepath, "utf-8", function(err, contents){
    if (err) {
      console.log("==================");
      console.log(chalk.red("no valid css-file found."));
      console.log("==================");
    }
      compareProperties(readProperties(contents), database, profile);
  });
};

module.exports = weasel;