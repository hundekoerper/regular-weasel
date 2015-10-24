var fs = require("fs")
,   database = require("../node_modules/caniuse-db/data.json")
,   readProperties = require ("./readProperties")
,   compareProperties = require ("./compareProperties")
,   profile = require("../profile.json")
,   chalk = require("chalk")
,   argv = require("minimist")(process.argv.slice(2));

function weasel() {
  if (profile.read_from_json === 1) {
  cssfile = profile.filepath;
  } else {
  cssfile = argv._[0];
  }

  fs.readFile(cssfile, "utf-8", function(err, contents){
    if (err) {
      console.log("==================");
      console.log(chalk.red("no valid css-file found."));
      console.log("==================");
    }
      compareProperties(readProperties(contents), database, profile);
  });
};

module.exports = weasel;