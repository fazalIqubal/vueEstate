import { handleResponse, requestGet, requestPost, requestPut, requestDelete, apiEndpoint } from '../helpers'
import queryString from 'query-string';

export const userService = {
  login,
  logout,
  signUp
};

function operationUrl(url) {
  return apiEndpoint + url;
}
function login(email, password) {
  const url = operationUrl(`/auth/login`);
  return requestPost(url, { email, password })
    .then((user) => {
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    })

}

function signUp(first_name, last_name, email, password, role) {
  const url = operationUrl(`/auth/signup`);
  return requestPost(url, { first_name, last_name, email, password, role })
    .then((user) => {
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    })
}

export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}