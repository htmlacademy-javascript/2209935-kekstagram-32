
const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const load = (route, method, body) =>
  fetch (`${BASE_URL}${route}`,{method, body})
    .then ((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });

const getData = () => load(Route.GET_DATA, 'GET');
const sendData = (body) => load(Route.SEND_DATA, 'POST', body);

export {getData, sendData};
