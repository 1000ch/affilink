const cheerio = require('cheerio');

let extractDefinition = new Map();
extractDefinition.set('title', {
  selector: '#productTitle'
});
extractDefinition.set('imageUrl', {
  selector: '#imgBlkFront',
  attr: 'src'
});

class DataFormat {

  constructor(html = '') {

    this.$ = cheerio.load(html);
  }

  extract() {
    
    let object = {};
    
    for (let [key, value] of extractDefinition.entries()) {
      let element = this.$(value.selector);
      object[key] = value.attr ? element.attr(value.attr) : element.text();
    }
    
    return object;
  }
}

module.exports = DataFormat;