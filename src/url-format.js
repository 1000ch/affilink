const validUrl    = require('valid-url');
const URL         = require('url');
const querystring = require('querystring');

class URLFormat {

  constructor(url) {
    
    if (!validUrl.isUri(url)) {
      console.error(`${url} is invalid URL`)
    }

    // parse url & querystring
    this.url = URL.parse(url);
    this.qs = querystring.parse(url.search);
  }

  addQueryString(key = '', value = '') {

    // add querystring
    this.qs[key] = value;

    // update querystring
    this.url.search = querystring.stringify(this.qs);
  }

  removeQueryString(key = '') {
    
    if (!this.qs.hasOwnProperty(key)) {
      console.log(`URL does not contain ${key} as querystring key`);
      return;
    }

    // delete key from qs object
    delete this.qs[key];

    // update querystring
    this.url.search = querystring.stringify(this.qs);
  }

  toString() {
    return URL.format(this.url);
  }
}

module.exports = URLFormat;