var output = function(versions, values) {

  var _ = require("underscore")
  ,   chalk = require("chalk")
  ,   temp = []
  ,   saveversion = ""
  ,   browsername = "";


  if(values.hasOwnProperty("opera")){
    values["opera"][9.5] = values["opera"]["9.5-9.6"];
    values["opera"][9.6] = values["opera"]["9.5-9.6"];
    values["opera"][10.0] = values["opera"]["10.0-10.1"];
    values["opera"][10.1] = values["opera"]["10.0-10.1"];
  }

  if(values.hasOwnProperty("ios_saf")){
    values["ios_saf"][4.0] = values["ios_saf"]["4.0-4.1"];
    values["ios_saf"][4.1] = values["ios_saf"]["4.0-4.1"];
    values["ios_saf"][5.0] = values["ios_saf"]["5.0-5.1"];
    values["ios_saf"][5.1] = values["ios_saf"]["5.0-5.1"];
    values["ios_saf"][6.0] = values["ios_saf"]["6.0-6.1"];
    values["ios_saf"][6.1] = values["ios_saf"]["6.0-6.1"];
    values["ios_saf"][7.0] = values["ios_saf"]["7.0-7.1"];
    values["ios_saf"][7.1] = values["ios_saf"]["7.0-7.1"];
    values["ios_saf"][8.1] = values["ios_saf"]["8.1-8.4"];
    values["ios_saf"][8.2] = values["ios_saf"]["8.1-8.4"];
    values["ios_saf"][8.3] = values["ios_saf"]["8.1-8.4"];
    values["ios_saf"][8.4] = values["ios_saf"]["8.1-8.4"];
  }

  if(values.hasOwnProperty("op_mini")){
    values["op_mini"][5] = values["op_mini"]["5.0-8.0"];
    values["op_mini"][6] = values["op_mini"]["5.0-8.0"];
    values["op_mini"][7] = values["op_mini"]["5.0-8.0"];
    values["op_mini"][8] = values["op_mini"]["5.0-8.0"];
  }

  if(values.hasOwnProperty("android")){
    values["android"][4.2] = values["android"]["4.2-4.3"];
    values["android"][4.3] = values["android"]["4.2-4.3"];
    values["android"][4.43] = values["android"]["4.4.3-4.4.4"];
    values["android"][4.44] = values["android"]["4.4.3-4.4.4"];
  }

  for (var i = 0, x = versions.length; i < x; i++){
    saveversion = versions[i][1];

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
      switch(versions[i][1]) {
        case "9.5-9.6":
        saveversion = versions[i][1];
        versions[i][1] = 9.5;
        break;
        case "10.0-10.1":
        saveversion = versions[i][1];
        versions[i][1] = 10.0;
        break;
      }
      break;
      case "ios_saf":
      break;
      case "op_mini":
      break;
      case "android":
      switch(versions[i][1]) {
        case "4.2-4.3":
        saveversion = versions[i][1];
        versions[i][1] = 4.2;
        break;
        case "4.4.3-4.4.4":
        saveversion = versions[i][1];
        versions[i][1] = 4.43;
        break;
      }
      break;
    };

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
    break;
    temp = [];

  }
    versions[i][1] = saveversion;

}

module.exports = output;
