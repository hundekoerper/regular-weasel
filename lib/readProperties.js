var readProperties = function(cssfile) {

  var css = require("css")
  ,   astobj = css.parse(cssfile, { source: cssfile })
  ,   _ = require('underscore')
  ,   properties = {};


  astobj.stylesheet.rules.forEach(function(rule) {
    rule.declarations.forEach(function(declaration) {
      if (!properties[declaration.property]) {
        properties[declaration.property] = [];
      }

      properties[declaration.property].push(declaration.position.start.line);
    });
  });

  return properties
};

module.exports = readProperties;
