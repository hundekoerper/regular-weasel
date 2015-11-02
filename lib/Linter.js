'use strict';

var _ = require('underscore')
,   normalizeVersion = require('./normalizeVersion')
,   semver = require('semver');

module.exports = class Linter {
  constructor(usedproperties, database, profile) {
    this.usedproperties = usedproperties;
    this.database = database;
    this.profile = profile;
  }
  run() {
    var self = this
    ,   compatible = true
    ,   canNotUse = {};

    self.forEachUsedPropertyInBrowserVersion(function(intersection) {
      if (
        !self.isRelevantRange(intersection.targetVersion, intersection.caniuseRange) ||
        self.isUsable(intersection.caniuseIndicator)
      ) {
        return;
      }

      compatible = false;

      if (!canNotUse[intersection.propertyName]) {
        canNotUse[intersection.propertyName] =
          self.createCanNotUseEntry(intersection);
      }

      self.addIncompatibleBrowsers(
        canNotUse[intersection.propertyName],
        intersection
      );
    });

    return {
      compatible: compatible,
      canNotUse: canNotUse
    };
  }
  addIncompatibleBrowsers(canNotUseEntry, intersection) {
    if (!canNotUseEntry.incompatibleBrowsers[intersection.browserKey]) {
      canNotUseEntry.incompatibleBrowsers[intersection.browserKey] = {};
    }

    canNotUseEntry.incompatibleBrowsers
      [intersection.browserKey]
      [intersection.caniuseRange] = intersection.caniuseIndicator;
  }
  createCanNotUseEntry(intersection) {
    return {
      notes: intersection.caniuseProp.notes,
      title: intersection.caniuseProp.title,
      description: intersection.caniuseProp.description,
      notesByNum: intersection.caniuseProp.notes_by_num,
      lines: intersection.lines,
      incompatibleBrowsers: {}
    };
  }
  forEachUsedPropertyInBrowserVersion(cb) {
    var self = this;

    self.forEachBrowser(function(targetVersion, browserKey) {
      self.forEachUsedProperty(function(propertyName, caniuseProp, lines) {
        _.forEach(caniuseProp.stats[browserKey], function(caniuseIndicator, caniuseRange) {
          cb({
            caniuseIndicator: caniuseIndicator,
            caniuseRange: caniuseRange,
            targetVersion: targetVersion,
            browserKey: browserKey,
            propertyName: propertyName,
            caniuseProp: caniuseProp,
            lines: lines
          })
        });
      });
    });
  }
  forEachBrowser(cb) {
    _.forEach(this.profile.browsers, function(targetVersion, browserKey) {
      if (targetVersion !== false) {
        cb(targetVersion, browserKey);
      }
    });
  }
  forEachUsedProperty(cb) {
    var self = this;

    _.forEach(self.usedproperties, function(lines, propertyName) {
      if (!self.database.data.hasOwnProperty(propertyName)) {
        return;
      }

      var caniuseProp = self.database.data[propertyName];

      cb(propertyName, caniuseProp, lines);
    });
  }
  isRelevantRange(version, range) {
    // normalize range
    range = range.split('-').join(' - ');
    return !semver.gtr(normalizeVersion(version), range);
  }
  isUsable(caniuseIndicator) {
    return caniuseIndicator[0] === 'y';
  }
}
