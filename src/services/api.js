import * as R from 'ramda';
import { loadAuthToken as jwt } from './localStorage';
import api from '../config/api';

/** Constants */
const origin = window.location.origin;
let url = R.contains('localhost', origin) ? api.localhost : api.production;
if (process.env.REACT_APP_API && process.env.REACT_APP_API === 'dev') {
  url = api.dev;
}
const apiUrl = `${url}/api`;
const defaultHeaders = {
  'Content-Type': 'application/json',
  'cache-control': 'no-cache',
  pragma: 'no-cache',
};

/** Generate headers for a request */
const headers = (requiresAuth, authToken) =>
  R.merge(defaultHeaders, requiresAuth ? { Authorization: `Bearer ${authToken || jwt()}` } : null);

/** Check for external route containing http/https */
const getURL = (route) => route.includes('http') ? route : `${apiUrl}/${route}`;

/** Parse a response based on the type */
const parseResponse = (response) => {
  const contentType = R.head(R.split(';')(R.defaultTo('')(response.headers.get('content-type'))));
  if (contentType === 'application/json') {
    return response.json();
  }
  return response.text(); // contentType === 'text/html'
};

/** Parse API error response */
const parseErrorResponse = (response) => response.json();

/** Check for API-level errors */
const checkStatus = (response) =>
  new Promise((resolve, reject) => {
    if (response.status >= 200 && response.status < 300) {
      resolve(response);
    } else {
      // Raven.captureMessage('API Error', response);
      parseErrorResponse(response)
        .then(({ message }) => reject(new Error(message)))
        .catch(reject);
    }
  });

/** Create a new Request object */
const request = (method, route, data, requiresAuth = true, authToken) => {
  const body = () => data ? { body: JSON.stringify(data) } : {};
  const baseOptions = {
    method: method.toUpperCase(),
    mode: 'cors',
    headers: new Headers(headers(requiresAuth, authToken)),
  };
  const requestOptions = R.merge(baseOptions, body());
  return new Request(getURL(route), requestOptions);
};

/** Execute a request using fetch */
const execute = (method, route, body = null, requiresAuth = true, authToken) =>
  new Promise((resolve, reject) => {
    fetch(request(method, route, body, requiresAuth, authToken))
      .then(checkStatus)
      .then(parseResponse)
      .then(resolve)
      .catch(reject);
  });

/** HTTP Methods */
const get = (route, requiresAuth = true, authToken) =>
  execute('get', route, null, requiresAuth, authToken);
const post = (route, body = null, requiresAuth = true, authToken) =>
  execute('post', route, body, requiresAuth, authToken);
const put = (route, body = null, requiresAuth = true) =>
  execute('put', route, body, requiresAuth);
const patch = (route, body = null, requiresAuth = true) =>
  execute('patch', route, body, requiresAuth);
const del = (route, requiresAuth = true) =>
  execute('delete', route, null, requiresAuth);

const login = formData => post('auth/login', formData);

export default {
  login,
};
