#!/usr/bin/env node

var weasel = require('./lib/index.js')
,   fs = require('fs')
,   _ = require('underscore')
,   profile = require('./profile.json')
,   argv = require('minimist')(process.argv.slice(2))
,   chalk = require('chalk');

if (!profile.read_from_json) {
  profile.filepath = argv._[0];
}

function browserKeyToName(browserKey) {
  switch(browserKey) {
    case 'ie':
      return 'Internet Explorer';
    case 'edge':
      return 'Edge';
    case 'firefox':
      return 'Firefox';
    case 'chrome':
      return 'Chrome';
    case 'safari':
      return 'Safari';
    case 'opera':
      return 'Opera';
    case 'ios_saf':
      return 'iOS Safari';
    case 'op_mini':
      return 'Opera Mini';
    case 'android':
      return 'Android Browser';
    case 'bb':
      return 'Blackberry Browser';
    case 'op_mob':
      return 'Opera Mobile';
    case 'and_chr':
      return 'Chrome for Android';
    case 'and_ff':
      return 'Firefox for Android';
    case 'ie_mob':
      return 'IE Mobile';
    case 'and_uc':
      return 'UC Browser for Android';
    default:
      return browserKey;
  };
}

function compatKeyToString(compatKey) {
  switch (compatKey[0]) {
    case 'a':
      return chalk.blue('Almost supported (aka Partial support)');
    case 'n':
      return chalk.red('No support, or disabled by default');
    case 'p':
      return chalk.yellow('No support, but has Polyfill');
    case 'u':
      return chalk.magenta('Support unknown');
    case 'x':
      return chalk.cyan('Requires prefix to work');
    case 'd':
      return chalk.yellow('Disabled by default (need to enable flag or something)');
  }
}

function exit(err) {
  console.error(chalk.red(err.stack));
  process.exit(1);
}

fs.readFile(profile.filepath, 'utf-8', function(err, contents){
  if (err) {
    exit(err);
  }

  delete profile.filepath;

  try {
    var compatibility = weasel(profile, contents);

    if (compatibility === true) {
      console.log('==================');
      console.log(chalk.green('there are no known compatibility issues with your css-file.'));
      console.log('==================');
    } else {
      _.forEach(compatibility.canNotUse, function(canNotUse, property) {
        console.log('==================');
        console.log(canNotUse.title + '\n');

        console.log('Used at line' + (canNotUse.lines.length > 1 ? 's' : '') + ': ' +
          canNotUse.lines.join(', '));

        if (profile.description) {
          console.log(canNotUse.description);
        }

        _.forEach(canNotUse.incompatibleBrowsers, function(compat, browserKey) {
          console.log('\n' + browserKeyToName(browserKey) + ':');
          _.forEach(compat, function(compatKey, browserVersion) {
            console.log('  v.' + browserVersion + ': ', compatKeyToString(compatKey));
          });
        });

        if (profile.additional_notes && !_.isEmpty(canNotUse.notesByNum)) {
          console.log('');
          _.forEach(canNotUse.notesByNum, function(note) {
            console.log(note);
          })
        }

        console.log('==================\n');
      });

      process.exit(1);
    }

  } catch (e) {
    exit(e);
  }
});
