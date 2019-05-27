const { fetchHelper, recursiveFetchHelper } = require("./fetch");
const makeConfig = require("./config");

/**
 * global definitions
 */
var fetchezData = {
  getToken: null,
  getNext: null,
  mergeResults: null
};

/**
 * Performs an api request
 * @param {string} url The Url to request
 * @param {dict} config The fetch fonfig (will be processed by the function fetchConfigHelper)
 */
async function fetchez(url, config) {
  const conf = config || {};
  const otherConfig = {};
  const { loadAll, auth } = conf;
  const { getToken, getNext, mergeResults } = fetchezData;
  Object.keys(conf)
    .filter(e => e !== "loadAdd" && e !== "auth")
    .forEach(e => (otherConfig[e] = conf[e]));

  if (auth && !getToken)
    throw 'fetchez : If you use "auth", you need to define "getToken"';

  const formattedConfig = await makeConfig(otherConfig, getToken);

  if (loadAll) {
    if (!getNext || !mergeResults)
      throw 'fetchez : If you use "loadAll", you need to define "getNext" and "mergeResults"';

    return await recursiveFetchHelper(
      url,
      formattedConfig,
      getNext,
      mergeResults
    );
  }

  return await fetchHelper(url, formattedConfig);
}

function configure(data) {
  const newData = {};
  Object.assign(newData, fetchezData);
  Object.assign(newData, data);
  fetchezData = newData;
}

fetchez.configure = configure;

module.exports = fetchez;
