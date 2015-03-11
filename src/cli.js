#!/usr/bin/env node

"use strict";

const fs         = require('fs');
const path       = require('path');
const request    = require('request');
const minimist   = require('minimist');
const validUrl   = require('valid-url');

const Template   = require('./template');
const URLFormat  = require('./url-format');
const DataFormat = require('./data-format');

let argv = minimist(process.argv.slice(2));

if (argv._.length === 0) {
  throw new Error('No arguments.');
}

let url = argv._.pop();

if (!validUrl.isUri(url)) {
  throw new Error('Invalid URL');
}

if (!argv.aid) {
  throw new Error('aid is not specified');
}

if (!argv.extract) {
  throw new Error('extract is not specified');
}

if (argv.extract && !fs.existsSync(path.resolve(argv.extract))) {
  throw new Error(`${argv.extract} does not exist`);
}

let template = new Template();
if (argv.template && fs.existsSync(path.resolve(argv.template))) {
  template.setTemplatePath(argv.template);
} else {
  template.setTemplatePath('./default.mustache');
}
  
let urlFormat = new URLFormat(url);
urlFormat.addQueryString('tag', argv.aid);

request(url, (error, response, body) => {
  
  if (error) {
    throw error;
  }
  
  if (response.statusCode !== 200) {
    throw new Error(`Error occured (Status code: ${response.statusCode})`);
  }

  let dataFormat = new DataFormat(body);
  dataFormat.setDefinitionPath(argv.extract);

  let object = dataFormat.extract();
  object.url = urlFormat.toString();

  console.log(template.render(object));
});