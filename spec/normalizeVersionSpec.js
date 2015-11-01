describe('normalizeVersion', function() {
  var normalizeVersion;

  beforeEach(function() {
    normalizeVersion = require('../lib/normalizeVersion');
  });

  it('should exist', function() {
    expect(normalizeVersion).toBeDefined();
  });

  it('should do nothing if version is fine', function() {
    var testVersion = '1.2.3';
    expect(normalizeVersion(testVersion)).toBe(testVersion);
  });

  it('should append patch level 0 when missing', function() {
    var testVersion = '1.2';
    expect(normalizeVersion(testVersion)).toBe(testVersion + '.0');
  });

  it('should append minor and patch level 0 when missing', function() {
    var testVersion = '1';
    expect(normalizeVersion(testVersion)).toBe(testVersion + '.0.0');
  });
});
