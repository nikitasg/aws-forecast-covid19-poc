const { getData } = require('./lib/getData');
const { writeDataToFile } = require('./lib/file');
const { makeCasesCsv, makeDeathsCsv } = require('./lib/createCsvs');

const runTime = new Date();

getData()
  .then(writeDataToFile('./data/data.json', { json: true }))
  .then(data => Promise.all([
    makeCasesCsv(data).then(writeDataToFile('./data/coronavirus-cases.csv')),
    makeDeathsCsv(data).then(writeDataToFile('./data/coronavirus-deaths.csv')),
  ]))
  .then(() => {
    return {
      fetchTimestamp: runTime.toISOString(),
    };
  })
  .then(writeDataToFile('./data/metadata.json', { json: true }));
