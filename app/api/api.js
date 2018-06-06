const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default class Api {
  static get(url) {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}${url}`)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }

  static post(url, body) {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}${url}`, { method: 'POST', body })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }

  static put(url, body) {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}${url}`, { method: 'PUT', body })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }
}