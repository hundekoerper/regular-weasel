var readProperties = function(cssfile) {

  var css = require('css')
  ,   astobj = css.parse(cssfile, { source: cssfile })
  ,   _ = require('underscore')
  ,   properties = {};


  astobj.stylesheet.rules.forEach(function(rule) {

    switch(rule.type) {
    case 'keyframes':
    if (!properties['css-animation']) {
      properties['css-animation'] = [];
    }
    properties['css-animation'].push(rule.position.start.line);
    break;
    case 'media':
    if (!properties['css-mediaqueries']) {
      properties['css-mediaqueries'] = [];
    }
    properties['css-mediaqueries'].push(rule.position.start.line);

    rule.rules.forEach(function(query) {
      query.declarations.forEach(function(declaration) {
        if (!properties[declaration.property]) {
          properties[declaration.property] = [];
        }

        properties[declaration.property].push(declaration.position.start.line);
      });
    });
    break;
    case 'font-face':
    if (!properties.fontface) {
      properties.fontface = [];
    }
    properties.fontface.push(rule.position.start.line);
    break;
  }


    if (rule.declarations) {
      rule.declarations.forEach(function(declaration) {
        if (!properties[declaration.property]) {
          properties[declaration.property] = [];
        }

        properties[declaration.property].push(declaration.position.start.line);
      });
    }
  });

  return properties
};

module.exports = readProperties;
