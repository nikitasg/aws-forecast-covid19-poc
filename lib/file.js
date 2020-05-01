const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

function writeDataToFile(path, { json = false } = {}) {
  return async (data) => {
    if (json) {
      var dataToWrite = JSON.stringify(data, null, 2);
    } else {
      dataToWrite = data;
    }
    await writeFile(path, dataToWrite, { encoding: 'utf8' });
    return data;
  }
}

module.exports = {
  writeDataToFile,
};
