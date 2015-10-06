var readProperties = function(cssfile) {

var css = require('css')
,   astobj = css.parse(cssfile, { source: cssfile })
,   properties = [];


for (var i = 0, x = astobj.stylesheet.rules.length; i < x; i++) {
  for (var j = 0, y = astobj.stylesheet.rules[i].declarations.length; j < y; j++) {
      properties.push([astobj.stylesheet.rules[i].declarations[j].property, astobj.stylesheet.rules[i].declarations[j].position.start.line]);
  }
}

return properties

};

module.exports = readProperties;
