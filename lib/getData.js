const axios = require('axios');
const parser = require('xml2json');

const dataBlobUrl = (blob) => `https://c19pub.azureedge.net/${blob}`;
const listBucketUrl = 'https://publicdashacc.blob.core.windows.net/publicdata?restype=container&comp=list';

async function getLatestBlobName() {
  const { data } = await axios.get(listBucketUrl);

  const jsonData = JSON.parse(parser.toJson(data));
  const blobList = jsonData.EnumerationResults.Blobs.Blob;
  
  const getBlobDate = b => new Date(b.Properties['Last-Modified']);
  const mostRecentBlob = blobList.reduce((acc, cur) => {
    if (!cur.Name.startsWith('data_')) {
      return acc;
    }

    if (!acc) {
      return cur;
    }

    return (getBlobDate(acc) > getBlobDate(cur)) ? acc : cur;
  }, null);

  return mostRecentBlob.Name;
}

async function getData () {
  const latestBlobName = await getLatestBlobName();
  const { data } = await axios.get(dataBlobUrl(latestBlobName));
  return data;
}

module.exports = {
  getData
}
