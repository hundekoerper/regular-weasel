describe('readProperties', function() {
  var readProperties;

  beforeEach(function() {
    readProperties = require('../lib/readProperties');
  });

  it('should find properties in css strings', function() {
    var testString = '.foo { margin:0; }';
    expect(Object.keys(readProperties(testString))).toContain('margin');
  });

  it('should keep track of line numbers in which properties were used', function() {
    var testString = '.foo { margin:0; }\n\n .bar { margin:5px; }';
    expect(readProperties(testString).margin).toEqual([1, 3]);
  });

  it('should be able to handle keyframes', function() {
    var testString = '@keyframes mymove {}';
    expect(Object.keys(readProperties(testString))).toContain('css-animation');
  });

  it('should extract properties from keyframes', function() {
    var testString = '@keyframes mymove {\nfrom {top: 0px;}\nto {top: 200px;}\n}';

    expect(Object.keys(readProperties(testString))).toContain('top');
  });

  it('should be able to handle media queries', function() {
    var testString = '@media screen, projection {}';
    expect(Object.keys(readProperties(testString))).toContain('css-mediaqueries');
  });

  it('should extract properties from media queries', function() {
    var testString = '@media screen, projection {\nhtml {\nbackground: #fff;\n}\n}';
    expect(Object.keys(readProperties(testString))).toContain('background');
  });

  it('should be able to handle font-face', function() {
    var testString = '@font-face {}';
    expect(Object.keys(readProperties(testString))).toContain('fontface');
  });

  it('should extract properties from font-face', function() {
    var testString = '@font-face {\nfont-family: myFirstFont;\n}';
    expect(Object.keys(readProperties(testString))).toContain('font-family');
  });

});
