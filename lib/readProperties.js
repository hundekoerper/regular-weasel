var readProperties = function(cssfile) {

  var css = require('css')
  ,   astobj = css.parse(cssfile, { source: cssfile })
  ,   _ = require('underscore')
  ,   properties = {};


  astobj.stylesheet.rules.forEach(function(rule) {

    if (rule.declarations) {
      rule.declarations.forEach(function(declaration) {
        if (!properties[declaration.property]) {
          properties[declaration.property] = [];
        }

        properties[declaration.property].push(declaration.position.start.line);
      });
    }
  });
  console.log(properties);
  return properties
};

module.exports = readProperties;
