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
function fetchez(url, config) {
  const { loadAll, auth, ...otherConfig } = config || {};
  const { getToken } = fetchezData;

  if (auth && !getToken)
    throw 'fetchez : If you use "auth", you need to define "getToken"';

  const formattedConfig = makeConfig(otherConfig, getToken);

  if (loadAll) {
    if (!getNext || !mergeResults)
      throw 'fetchez : If you use "loadAll", you need to define "getNext" and "mergeResults"';

    return returnPromiseOrResolve(
      recursiveFetchHelper,
      formattedConfig,
      getNext,
      mergeResults
    );
  }

  return fetchHelper(url, formattedConfig);
}

function configure(data) {
  fetchezData = {
    ...fetchezData,
    ...data
  };
}

fetchez.configure = configure;

module.exports = fetchez;
