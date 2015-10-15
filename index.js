#! /usr/bin/env node

var fs = require("fs")
    database = require("./node_modules/caniuse-db/data.json")
,   readProperties = require ("./readProperties")
,   compareProperties = require ("./compareProperties")
,   profile = require("./profile.json");

fs.readFile(profile.filepath, "utf-8", function(err, contents){
  if (err) {
    console.log(err);
  }
    compareProperties(readProperties(contents), database, profile);
});
