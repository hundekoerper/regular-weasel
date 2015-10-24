#!/usr/bin/env node

var weasel = require('./lib/index.js')
,   profile = require("./profile.json")
,   argv = require("minimist")(process.argv.slice(2));

if (profile.read_from_json === 0) {
  profile.filepath = argv._[0];
}

weasel(profile);


