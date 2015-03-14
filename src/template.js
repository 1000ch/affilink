const fs       = require('fs');
const path     = require('path');
const Mustache = require('mustache');

class Template {

  constructor(template = '') {
    this.template = template;
  }

  setTemplatePath(p = '') {

    let absolutePath = path.resolve(p);

    if (!fs.existsSync(absolutePath)) {
      console.error(`${p} does not exist`);
      return;
    }

    let buffer = fs.readFileSync(absolutePath, {
      encoding: 'utf8'
    });
    
    this.template = buffer.toString();
  }

  render(data = {}) {
    return Mustache.render(this.template, data);
  }
}

module.exports = Template;