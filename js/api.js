
const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const load = (route, method, body) => // загружает данные по сети
  fetch (`${BASE_URL}${route}`,{method, body})
    .then ((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });

const getData = () => load(Route.GET_DATA, 'GET'); // загружает данные с сервера
const sendData = (body) => load(Route.SEND_DATA, 'POST', body); // загружает данные от пользователя

export {getData, sendData};
