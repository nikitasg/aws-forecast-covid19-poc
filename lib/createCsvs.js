function objectToCSV(obj) {
  return obj.map(x => JSON.stringify(x).replace(/^\[|\]$/g, '')).join('\n');
}

function summariseCases(title) {
  return (accumulator, [code, data]) => {
    const { name: { value: name } } = data;
    if (!(data.dailyConfirmedCases && data.dailyTotalConfirmedCases)) return accumulator;

    const caseData = [...new Set([
      ...Object.values(data.dailyConfirmedCases).map(x => x.date),
      ...Object.values(data.dailyTotalConfirmedCases).map(x => x.date),
    ])].map(x => ({
      date: x,
      new: data.dailyConfirmedCases.find(y => y.date == x),
      total: data.dailyTotalConfirmedCases.find(y => y.date == x),
    }));

    for (const cases of caseData ) {
      const {
        date,
        new: { value: newCases } = { value: null },
        total: { value: totalCases } = { value: null },
      } = cases;
      accumulator.push([
        name, code, title, date, newCases, totalCases
      ])
    }
    return accumulator;
  }
}

function summariseDeaths(title) {
  return (accumulator, [code, data]) => {
    const { name: { value: name } } = data;
    if (!(data.dailyDeaths && data.dailyTotalDeaths)) return accumulator;

    const deathData = [...new Set([
      ...Object.values(data.dailyDeaths).map(x => x.date),
      ...Object.values(data.dailyTotalDeaths).map(x => x.date),
    ])].map(x => ({
      date: x,
      new: data.dailyDeaths.find(y => y.date == x),
      total: data.dailyTotalDeaths.find(y => y.date == x),
    }));

    for (const deaths of deathData ) {
      const {
        date,
        new: { value: newDeaths } = { value: null },
        total: { value: totalDeaths } = { value: null },
      } = deaths;
      accumulator.push([
        name, code, title, date, newDeaths, totalDeaths
      ])
    }
    return accumulator;
  }
}

const sorter = (col) => (a, b) => {
  if (a[col] < b[col]) return -1;
  if (a[col] == b[col]) return 0;
  return 1;
}

function csvMakerFactory({ titles, summariser }) {
  return async data => {
    const csvData = [
      ...Object.entries(data.overview).reduce(summariser('Country - UK'), []),
      ...Object.entries(data.countries).reduce(summariser('Country'), []),
      ...Object.entries(data.regions).reduce(summariser('Region'), []),
      ...Object.entries(data.utlas).reduce(summariser('Upper tier local authority'), []),
    ].sort(sorter(3));

    return objectToCSV([
      titles,
      ...csvData,
    ]);
  }
}
  
const makeCasesCsv = csvMakerFactory({
  titles: [
    'Area name',
    'Area code',
    'Area type',
    'Specimen date',
    'Daily lab-confirmed cases',
    'Cumulative lab-confirmed cases',
  ],
  summariser: summariseCases,
});

const makeDeathsCsv = csvMakerFactory({
  titles: [
    'Area name',
    'Area code',
    'Area type',
    'Reporting date',
    'Daily hospital deaths',
    'Cumulative hospital deaths',
  ],
  summariser: summariseDeaths,
});


module.exports = {
  makeCasesCsv,
  makeDeathsCsv,
}
