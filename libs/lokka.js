import {Lokka} from 'lokka'
import {Transport} from 'lokka-transport-http'

let headers = {};
const url = 'https://api.graph.cool/simple/v1/cj3janzsw53tk0170pnnjuzmg';

if (process.browser && localStorage.getItem('auth_token')) {
  headers.Authorization = `Bearer ${localStorage.getItem('auth_token')}`
}

let client = new Lokka({ transport: new Transport(url, {headers}) });

export const setToken = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }
  if (process.browser) {
    localStorage.setItem('auth_token', token);
  }

  client._transport = new Transport(url, {headers});
}

export const createFragment = (query) => client.createFragment(query);

export const query = (query, vars) => client.query(query, vars);

export const mutate = (query) => client.mutate(query);
