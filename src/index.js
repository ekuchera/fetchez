import "@babel/polyfill";
import { fetchHelper, recursiveFetchHelper } from "./fetch";
import makeConfig from "./config";

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
  const { loadAll, auth, ...otherConfig } = config || {};
  const { getToken, getNext, mergeResults } = fetchezData;

  if (auth && !getToken)
    throw 'fetchez : If you use "auth", you need to define "getToken"';

  const formattedConfig = await makeConfig(otherConfig, auth && getToken);

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
  fetchezData = {
    ...fetchezData,
    ...data
  };
}

fetchez.configure = configure;

export default fetchez;
