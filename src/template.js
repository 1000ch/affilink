const fs       = require('fs');
const path     = require('path');
const Mustache = require('mustache');

class Template {

  constructor(template = '') {
    this.template = template;
  }

  setTemplatePath(templatePath = '') {

    if (!fs.existsSync(path.resolve(templatePath))) {
      console.error(`${templatePath} does not exist`);
      return;
    }

    let buffer = fs.readFileSync(path.resolve(templatePath), {
      encoding: 'utf8'
    });
    
    this.template = buffer.toString();
  }

  render(data = {}) {
    return Mustache.render(this.template, data);
  }
}

module.exports = Template;