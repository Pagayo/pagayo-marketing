const fs = require('fs');
const path = require('path');

module.exports = function () {
  const countriesDir = path.join(__dirname, 'countries');
  const files = fs.readdirSync(countriesDir).filter((f) => f.endsWith('.json'));

  return files.map((file) => {
    const filePath = path.join(countriesDir, file);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  });
};
