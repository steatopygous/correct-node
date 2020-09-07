#!/usr/bin/env node

const correctNodeVersion = require('../lib/correct-node');

const version = correctNodeVersion();

if (version.correct) {
  process.exit(0);
} else {
  console.error(version.reason);

  process.exit(-1);
}

