var output = function(versions, values) {

  var _ = require("underscore")
  ,   chalk = require("chalk")
  ,   temp = []
  ,   browsername = "";

  for (var i = 0, x = versions.length; i < x; i++){

    console.log("");
    switch(versions[i][0]) {
      case "ie":
      browsername = "Internet Explorer";
      break;
      case "edge":
      browsername = "Edge";
      break;
      case "firefox":
      browsername = "Firefox";
      break;
      case "chrome":
      browsername = "Chrome";
      break;
      case "safari":
      browsername = "Safari";
      break;
      case "opera":
      browsername = "Opera";
      break;
      case "ios_saf":
      browsername = "iOS Safari";
      break;
      case "op_mini":
      browsername = "Opera Mini";
      break;
      case "android":
      browsername = "Android Browser";
      break;
      case "bb":
      browsername = "Blackberry Browser";
      break;
      case "op_mob":
      browsername = "Opera Mobile";
      break;
      case "and_chr":
      browsername = "Chrome for Android";
      break;
      case "and_ff":
      browsername = "Firefox for Android";
      break;
      case "ie_mob":
      browsername = "IE Mobile";
      break;
      case "and_uc":
      browsername = "UC Browser for Android";
      break;

    };
    console.log(chalk.underline(browsername + " compatibilty:"));
    console.log("");

    switch(versions[i][0]) {
      case "opera":
      break;
      case "ios_saf":
      break;
      case "op_mini":
      break;
      case "android":
      break;
      default:
      temp = _.pairs(values[versions[i][0]]);
      for (var j = 0, y = temp.length; j < y; j++){
        if (temp[j][0] >= versions[i][1] && temp[j][1] === "y"){
        console.log("Version " + temp[j][0] + ": " + chalk.green("supported"))
        } else if (temp[j][0] >= versions[i][1] && temp[j][1] === "n") {
        console.log("Version " + temp[j][0] + ": " + chalk.red("not supported"));
        } else if (temp[j][0] >= versions[i][1]) {
        console.log("Version " + temp[j][0] + ": " + chalk.yellow("partially supported"));
        }
      }
      temp = [];
      break;

    };

  }

  // console.log(values); //for debug
  // console.log(versions); //for debug

}

module.exports = output;
