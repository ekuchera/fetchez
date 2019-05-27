/**
 * Transforms the given config
 * method replaced by GET if absent
 * if auth = true, adds the token authorization header
 * if json is not false, adds the json content type
 * (By default, considers that we are using json)
 * If body provided, it will automatically be
 * stringified to JSON if json is not set to false
 * @param {dict} config
 */
function makeConfig(config, getToken) {
  // Keeping headers defined by the user.
  const headers = {};
  Object.assign(headers, config.headers);
  const { json, body } = config;

  // Adding json Content Type header
  if (json !== false) headers["Content-Type"] = "application/json";

  // if has auth, adding the authorization header
  if (getToken) headers.Authorization = getToken();

  const newConfig = {
    method: config.method || "GET",
    headers
  };

  if (body)
    newConfig.body = json === false ? body : JSON.stringify(config.body);

  return newConfig;
}

module.exports = makeConfig;
