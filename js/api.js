const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const getData = (onError) =>
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => response.json())
    .catch(onError);

const sendData = (body) =>
  fetch (`${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body,
    }
  ).then ((response) => {
    if (!response.ok) {
      throw new Error();
    }
  })
    .catch(() => {
      throw new Error();
    });

export {getData, sendData};
