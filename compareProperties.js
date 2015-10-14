var comepareProperties = function(usedproperties, database, profile) {

  var chalk = require('chalk')
  ,   _ = require('underscore')
  ,   versionConverter = require('./versionConverter')
  ,   output = require('./output')
  ,   compatibility = true
  ,   browser = []
  ,   matches = []
  ,   versions = []
  ,   values = {}
  ,   temp = [];

  for (var bsr in profile.browsers) {
    if (profile.browsers[bsr] !== 0) {
      browser.push(bsr);
    }
  }

  for (var i = 0, x = usedproperties.length; i < x; i++) {
    if (database.data.hasOwnProperty(usedproperties[i][0])) {
      matches.push([usedproperties[i][0], usedproperties[i][1]]);
    }
  };

  for (var i = 0, x = matches.length; i < x ; i++) {
    for (var j = i + 1; j < x; j++) {
      if (matches[i][0] === matches[j][0]) {
        matches[i] = _.union(matches[i], matches[j]);
        temp.push(j);
      }
    }
  }

  temp = _.uniq(temp);
  for (var i = 0, x = temp.length; i < x; i++) {
    delete matches[temp[i]];
  }

  matches = _.compact(matches);
  temp = [];

  for (var i = 0, x = matches.length; i < x; i++) {
    values = _.pick(database.data[matches[i][0]].stats, browser);
  }

  temp = _.values(values);
  for (var i = 0, x = temp.length; i < x; i++) {
    for (var cbty in temp[i]) {
      if(temp[i][cbty] !== "y") {
        compatibility = false;
      };
    }
  }
  temp = [];

  versions = versionConverter(profile, database);

  if (matches.length === 0 || compatibility === true){
    console.log("==================");
    console.log(chalk.green("there are no known compatibility issues with your css-file."));
    console.log("==================");
    console.log("");
  } else if (browser.length === 0){
    console.log("==================");
    console.log(chalk.yellow("please select at least one browser in the profile.json."));
    console.log("==================");
    console.log("");
  } else {
    for (var i = 0, x = matches.length; i < x; i++) {
      console.log("==================");
      console.log("You used " + chalk.bold(matches[i][0]) + " at");
      for (var j = 1, y = matches[i].length; j < y; j++) {
        temp.push(matches[i][j]);
      }
      console.log("Line: " + temp);
      console.log("==================");
      temp = [];

      if (profile.description === 1) {
        console.log(database.data[matches[i][0]].title);
        console.log("");
        console.log(database.data[matches[i][0]].description);
        console.log("");
      }

      output(versions, values);

      console.log("");
      if (profile.additional_notes === 1) {
        console.log(chalk.underline("Additional Notes:"));
        console.log("");
        console.log(database.data[matches[i][0]].notes);
        console.log("");

        for (var value in database.data[matches[i][0]].notes_by_num){
          console.log(database.data[matches[i][0]].notes_by_num[value]);
          console.log("");
        };
      }
    }
  }


};

module.exports = comepareProperties;
