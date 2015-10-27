var versionConverter = function (profile, database) {

  var chalk = require('chalk')
  ,   _ = require('underscore')
  ,   versions = [];

  for (var bsr in profile.browsers) {
    if (profile.browsers[bsr] !== 0) {
      versions.push([bsr, profile.browsers[bsr]]);
    }
  }

  for (var i = 0, x = versions.length; i < x; i++) {
    switch(versions[i][0]) {
      case 'ie':
      if (versions[i][1] < 6 ) {
        versions[i][1] = 6;
      };
      break;
      case 'edge':
      if (versions[i][1] < 12 ) {
        versions[i][1] = 12;
      };
      break;
      case 'firefox':
      if (versions[i][1] < 2 ) {
        versions[i][1] = 2;
      };
      break;
      case 'chrome':
      if (versions[i][1] < 4 ) {
        versions[i][1] = 4;
      };
      break;
      case 'safari':
      if (versions[i][1] < 6 ) {
        versions[i][1] = 6;
      };
      break;
      case 'opera':
      if (versions[i][1] < 9 ) {
        versions[i][1] = 9;
      };
      switch(versions[i][1]) {
        case '9.5-9.6':
        versions[i][1] = 9.5;
        break;
        case '10.0-10.1':
        versions[i][1] = 10.0;
        break;
      };
      break;
      case 'ios_saf':
      if (versions[i][1] < 3.2 ) {
        versions[i][1] = 3.2;
      };
      switch(versions[i][1]) {
        case '4.0-4.1':
        versions[i][1] = 4;
        break;
        case '4.2-4.3':
        versions[i][1] = 4.2;
        break;
        case '5.0-5.1':
        versions[i][1] = 5;
        break;
        case '6.0-6.1':
        versions[i][1] = 6;
        break;
        case '7.0-7.1':
        versions[i][1] = 7;
        break;
        case '8.1-8.4':
        versions[i][1] = 8.1;
        break;
      };
      break;
      case 'android':
      if (versions[i][1] < 2.1 ) {
        versions[i][1] = 2.1;
      };
      switch(versions[i][1]) {
        case '4.2-4.3':
        versions[i][1] = 4.2;
        break;
        case '4.4.3-4.4.4':
        versions[i][1] = 4.43;
        break;
      };
      break;
      case 'op_mini':
      versions[i][1] = 5
      break;
      case 'bb':
      if (versions[i][1] < 7 ) {
        versions[i][1] = 7;
      };
      break;
      case 'op_mob':
      if (versions[i][1] < 10 ) {
        versions[i][1] = 10;
      };
      break;
      case 'and_chr':
      versions[i][1] = 45;
      break;
      case 'and_ff':
      versions[i][1] = 41;
      break;
      case 'ie_mob':
      if (versions[i][1] < 10 ) {
        versions[i][1] = 10;
      };
      break;
      case 'and_uc':
      versions[i][1] = 45;
      break;
    }
  }

 return versions;

};

module.exports = versionConverter;
