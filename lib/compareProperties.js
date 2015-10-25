var comepareProperties = function(usedproperties, database, profile) {
  var _ = require("underscore");
  var normalizeBrowserVersions = require("./normalizeBrowserVersions");
  var compatible = true;
  var canNotUse = {};

  _.forEach(profile.browsers, function(targetVersion, browserKey) {
    if (!targetVersion) {
      return;
    }

    _.forEach(usedproperties, function(lines, propertyName) {
      if (!database.data.hasOwnProperty(propertyName)) {
        return;
      }

      var caniuseProp = database.data[propertyName];

      normalizeBrowserVersions(caniuseProp.stats[browserKey]);

      _.forEach(caniuseProp.stats[browserKey], function(caniuse, caniuseVersion) {
        if (caniuseVersion < targetVersion) {
          return;
        }

        if (caniuse[0] === 'y') {
          return;
        } else {
          compatible = false;

          if (!canNotUse[propertyName]) {
            canNotUse[propertyName] = {
              notes: caniuseProp.notes,
              title: caniuseProp.title,
              description: caniuseProp.description,
              notesByNum: caniuseProp.notes_by_num,
              lines: lines,
              incompatibleBrowsers: {}
            };
          }

          if (!canNotUse[propertyName].incompatibleBrowsers[browserKey]) {
            canNotUse[propertyName].incompatibleBrowsers[browserKey] = {};
          }

          canNotUse[propertyName].incompatibleBrowsers[browserKey][caniuseVersion] = caniuse;
        }
      });
    });
  });

  return {
    compatible: compatible,
    canNotUse: canNotUse
  };

};

module.exports = comepareProperties;
