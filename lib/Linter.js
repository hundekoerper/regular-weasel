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
    var compatible = true
    ,   canNotUse = {};

    this.forEachUsedPropertyInBrowserVersion(intersection => {
      if (
        !this.isRelevantRange(intersection.targetVersion, intersection.caniuseRange) ||
        this.isUsable(intersection.caniuseIndicator)
      ) {
        return;
      }

      compatible = false;

      if (!canNotUse[intersection.propertyName]) {
        canNotUse[intersection.propertyName] =
          this.createCanNotUseEntry(intersection);
      }

      this.addIncompatibleBrowsers(
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


    this.forEachBrowser((targetVersion, browserKey) => {
      this.forEachUsedProperty((propertyName, caniuseProp, lines) => {
        _.forEach(caniuseProp.stats[browserKey], (caniuseIndicator, caniuseRange) => {
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

    _.forEach(this.usedproperties, (lines, propertyName) => {
      if (!this.database.data.hasOwnProperty(propertyName)) {
        return;
      }

      var caniuseProp = this.database.data[propertyName];
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
