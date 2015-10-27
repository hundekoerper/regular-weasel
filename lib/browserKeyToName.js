module.exports = function(browserKey) {
  var browsername;

  switch(browserKey) {
  case 'ie':
  browsername = 'Internet Explorer';
  break;
  case 'edge':
  browsername = 'Edge';
  break;
  case 'firefox':
  browsername = 'Firefox';
  break;
  case 'chrome':
  browsername = 'Chrome';
  break;
  case 'safari':
  browsername = 'Safari';
  break;
  case 'opera':
  browsername = 'Opera';
  break;
  case 'ios_saf':
  browsername = 'iOS Safari';
  break;
  case 'op_mini':
  browsername = 'Opera Mini';
  break;
  case 'android':
  browsername = 'Android Browser';
  break;
  case 'bb':
  browsername = 'Blackberry Browser';
  break;
  case 'op_mob':
  browsername = 'Opera Mobile';
  break;
  case 'and_chr':
  browsername = 'Chrome for Android';
  break;
  case 'and_ff':
  browsername = 'Firefox for Android';
  break;
  case 'ie_mob':
  browsername = 'IE Mobile';
  break;
  case 'and_uc':
  browsername = 'UC Browser for Android';
  break;
  };

  return browsername;
}
