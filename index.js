var fs = require("fs")
    database = require("./node_modules/caniuse-db/data.json")
,   readProperties = require ("./readProperties")
,   profile = require("./profile.json");

fs.readFile(profile.filepath, "utf-8", function(err, contents){
  if (err) {
    console.log(err);
  }
    console.log(readProperties(contents));
});
