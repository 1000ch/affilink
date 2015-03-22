#!/usr/bin/env node

"use strict";

const minimist = require('minimist');
const validUrl = require('valid-url');
const Affilink = require('./affilink');

let argv = minimist(process.argv.slice(2));
process.stdout.on('error', process.exit);

if (argv._.length === 0) {
  console.error(new Error('No arguments.'));
  process.exit(1);
}

let url = argv._.pop();

if (!validUrl.isUri(url)) {
  console.error(new Error('Invalid URL'));
  process.exit(1);
}

if (!argv.aid) {
  console.error(new Error('--aid is not specified'));
  process.exit(1)
}

if (!argv.extract) {
  console.error(new Error('--extract is not specified'));
  process.exit(1);
}

let affilink = new Affilink(argv.aid, argv.extract, argv.template);

affilink.get(url).then(
  (string) => console.log(string),
  (error) => console.error(error)
);