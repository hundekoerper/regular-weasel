var comepareProperties = function(usedproperties, database, profile) {

  var chalk = require('chalk')
  ,   _ = require('underscore')
  ,   browser = []
  ,   matches = [];

  for (var bsr in profile.browsers) {
    if (profile.browsers[bsr] !== 0) {
      browser.push([bsr, profile.browsers[bsr]]);
    }
  }

  for (var i = 0, x = usedproperties.length; i < x; i++) {
    if (database.data.hasOwnProperty(usedproperties[i][0])) {
      matches.push([usedproperties[i][0], usedproperties[i][1]]);
    }
  };

// for (var i = 0, x = matches.length; i < x; i ++) {
//   if
// }
//
//   matches = _.union(matches[0], matches[1]);

  if (matches.length === 0){
    console.log("==================");
    console.log(chalk.green("there are no known compatibility issues in your css-file."));
    console.log("==================");
    console.log("");
  } else if (browser.length === 0){
    console.log("==================");
    console.log(chalk.yellow("please select at least one browser in the profile.json."));
    console.log("==================");
    console.log("");
  } else {
    // for(var i = 0, x = matches.length; i < x; i++) {
    //   console.log("==================");
    //   console.log("You used " + chalk.bold(matches[i][0]));
    //   console.log("at Line " + matches[i][1]);
    //   console.log("==================");
    // }
    console.log(matches);
  }


};

module.exports = comepareProperties;
