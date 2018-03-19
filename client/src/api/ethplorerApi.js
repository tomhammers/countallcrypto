// https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API#get-address-info

const baseUrl = 'https://api.ethplorer.io/';
const apiKey = 'freekey';

function fetchJSON(url) {
  return fetch(url)
    .then(res => res.json())
    .then(body => {
      if (body.Response === 'Error') throw body.Message;
      return body;
    });
}

function addressInfo(address) {
  const url = `${baseUrl}getAddressInfo/${address}?apiKey=${apiKey}`;
  return fetchJSON(url);
}

module.exports = {
  addressInfo,
};
