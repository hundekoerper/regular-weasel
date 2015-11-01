var comepareProperties = function(usedproperties, database, profile) {
  var _ = require('underscore')
  ,   normalizeVersion = require('./normalizeVersion')
  ,   semver = require('semver')
  ,   compatible = true
  ,   canNotUse = {};

  _.forEach(profile.browsers, function(targetVersion, browserKey) {
    if (!targetVersion) {
      return;
    }

    _.forEach(usedproperties, function(lines, propertyName) {
      if (!database.data.hasOwnProperty(propertyName)) {
        return;
      }

      var caniuseProp = database.data[propertyName];

      _.forEach(caniuseProp.stats[browserKey], function(caniuse, caniuseRange) {
        // normalize ranges
        caniuseRange = caniuseRange.split('-').join(' - ');
        if (semver.gtr(normalizeVersion(targetVersion), caniuseRange)) {
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

          canNotUse[propertyName].incompatibleBrowsers[browserKey][caniuseRange] = caniuse;
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
