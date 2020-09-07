const fs = require('fs');
const semver = require('semver');

const PACKAGE_JSON = 'package.json';
const NVMRC = '.nvmrc';

function correctNode() {
  const havePackageJson = fs.existsSync(PACKAGE_JSON);

  if (havePackageJson) {
    const haveNvmrc = fs.existsSync(NVMRC);
    const version = packageNodeVersion();

    if (version) {
      if (haveNvmrc) {
        return error(`This folder contains both a ${PACKAGE_JSON} with the Node engine specified and a ${NVMRC} file.`);
      }

      return checkVersion(version, PACKAGE_JSON);
    } else {
      if (haveNvmrc) {
        return checkNvmrcVersion();
      } else {
        return error(`The ${PACKAGE_JSON} does not specify a Node engine version and there is no ${NVMRC} file.`);
      }
    }
  } else {
    return error(`This folder contains no ${PACKAGE_JSON} file.`);
  }
}

function packageNodeVersion() {
  const json = fs.readFileSync(PACKAGE_JSON).toString();
  const packageContents = JSON.parse(json);

  if (packageContents.engines && packageContents.engines.node) {
    return packageContents.engines.node;
  }

  return undefined;
}

function checkNvmrcVersion() {
  const version = fs.readFileSync(NVMRC).toString().trim();

  return checkVersion(version, NVMRC); 
}

function checkVersion(version, source) {
  const nodeVersion = process.version;

  if (semver.satisfies(nodeVersion, version)) {
    return { correct: true };
  } else {
    return error(`The current Node version (${nodeVersion}) does not match the one specified in ${source} (${version}).`);
  }
}


function error(reason) {
  return { correct: false, reason };
}


module.exports = correctNode;

