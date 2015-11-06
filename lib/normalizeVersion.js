var normalizeVersion = function(version) {

  if (typeof version === 'number') {
    version = version.toString();
  }

  if (version.indexOf('.') === -1) {
    version = version + ".0.0";
  } else if(version.indexOf('.') === version.lastIndexOf('.')) {
    version = version + ".0";
  }

  return version;
};

module.exports = normalizeVersion;
