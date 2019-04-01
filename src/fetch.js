// Test if res has JSON Content Type header
function isResJson() {
  const ct = res.headers.get("content-type");
  const isJson = ct && ct.includes("application/json");

  return isJson;
}

/**
 * Simplifies fetch request syntax by automatically parsing JSON when content type is JSON
 * @param {string} url The Url
 * @param {dict} config Fetch config dictionnary with request method, headers etc...
 * @param {function} resolve Success callback called with json parsed data
 * @param {function} reject Failure callback called with error
 */
async function fetchHelper(url, config) {
  // Performing request
  let res = await fetch(url, config);
  const isJson = isResJson(res);
  const { ok } = res;

  // Transforming res to JSON
  if (isJson) res = await res.json();

  // If not correst res, reject
  if (!ok) throw res;

  return res;
}
