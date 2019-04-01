const fetchHelper = require("./fetch");

/**
 * Transforms the given config
 * method replaced by GET if absent
 * if auth = true, adds the token authorization header
 * if json is not false, adds the json content type
 * @param {dict} config
 */
function fetchConfigHelper(config) {
  const headers = {
    ...config.headers
  };

  if (config.json !== false) headers["Content-Type"] = "application/json";

  if (config.auth) {
    const token = Auth.getToken();

    headers.Authorization = `JWT ${token}`;
  }

  const newConfig = {
    method: config.method || "GET",
    headers
  };

  if (config.body) newConfig.body = JSON.stringify(config.body);

  return newConfig;
}

function apiRestLoadAllPagesRec(url, config, prevData, resolve, reject) {
  fetchHelper(
    url,
    config,
    data => {
      const values = [...prevData, ...data.results];
      if (data.next)
        apiRestLoadAllPagesRec(data.next, config, values, resolve, reject);
      else resolve(values);
    },
    reject
  );
}

/**
 * Returns all results from a rest api with multiple pages
 * @param {string} url The Url
 * @param {dict} config The fetch fonfig
 * @param {function} resolve Success callback called with data
 * @param {function} reject Error callback called with error
 */
function apiRestLoadAllPages(url, config, resolve, reject) {
  fetchHelper(
    url,
    config,
    data => {
      if (data.next)
        apiRestLoadAllPagesRec(
          data.next,
          config,
          data.results,
          resolve,
          reject
        );
      else resolve(data.results);
    },
    reject
  );
}

/**
 * Performs an api request
 * @param {string} url The Url to request
 * @param {dict} config The fetch fonfig (will be processed by the function fetchConfigHelper)
 * @param {function} resolve Success callback called with returned data
 * @param {function} reject Error callback called with error
 */
function simpleRequest(url, config, resolve, reject, loadAll = false) {
  const c = fetchConfigHelper(config);

  if (loadAll) return apiRestLoadAllPages(url, c, resolve, reject);

  return fetchHelper(url, c, resolve, reject);
}

export { fetchHelper, fetchConfigHelper, apiRestLoadAllPages, simpleRequest };
