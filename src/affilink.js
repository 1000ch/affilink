const fs         = require('fs');
const path       = require('path');

const request    = require('request');
const validUrl   = require('valid-url');

const Template   = require('./template');
const URLFormat  = require('./url-format');
const DataFormat = require('./data-format');

class Affilink {

  constructor(aid = '', extract = '', template = '') {

    if (!aid) {
      throw new Error('aid is not specified');
    }

    if (!extract) {
      throw new Error('extract is not specified');
    }

    if (extract && !fs.existsSync(path.resolve(extract))) {
      throw new Error(`${extract} does not exist`);
    }

    this.template = new Template();
    this.aid = aid;
    this.extract = extract;

    if (template && fs.existsSync(path.resolve(template))) {
      this.template.setTemplatePath(template);
    } else {
      this.template.setTemplatePath(path.join(__dirname, '../default.mustache'));
    }
  }

  get(url = '') {

    if (!validUrl.isUri(url)) {
      throw new Error(`${url} is invalid URL`);
    }

    let urlFormat = new URLFormat(url);
    urlFormat.addQueryString('tag', this.aid);

    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        
        if (error) {
          reject(error);
        }
        
        if (response.statusCode !== 200) {
          reject(Error(`Error occured (Status code: ${response.statusCode})`));
        }

        let dataFormat = new DataFormat(body);
        dataFormat.setDefinitionPath(this.extract);

        let object = dataFormat.extract();
        object.url = urlFormat.toString();

        resolve(this.template.render(object));
      });
    });
  }
}

module.exports = Affilink;