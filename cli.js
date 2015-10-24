#!/usr/bin/env node

var weasel = require('./lib/index.js')
,   fs = require("fs")
,   profile = require("./profile.json")
,   argv = require("minimist")(process.argv.slice(2))
,   chalk = require("chalk");

if (profile.read_from_json === 0) {
  profile.filepath = argv._[0];
}

fs.readFile(profile.filepath, "utf-8", function(err, contents){
  if (err) {
    console.error(chalk.red('ERROR: ' + err.message));
    process.exit(1);
  }

  delete profile.filepath;

  weasel(profile, contents);
});
