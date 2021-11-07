const BASE_URL = "http://localhost:3001";
async function client(endpoint, method, { body, ...customConfig } = {}) {
  const headers = {};
  let requestBody = body;

  if (body && !(body instanceof FormData)) {
    requestBody = JSON.stringify(body);
    headers["content-type"] = "application/json";
  }

  const config = {
    method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (requestBody) {
    config.body = requestBody;
  }

  const response = await window.fetch(`${BASE_URL}${endpoint}`, config);

  try {
    return await response.json();
  } catch (err) {
    return response;
  }
}

export default client;
