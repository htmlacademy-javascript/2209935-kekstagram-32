
const BASE_URL = 'https://32.javascript.htmlacademy.pr/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};


// function isDataCorrect (inputArray) {
//   for (let i = 0; i < inputArray.length; i++) {
//     if (inputArray[i].id !== undefined && inputArray[i].url !== undefined && inputArray[i].likes !== undefined && inputArray[i].description !== undefined && inputArray[i].comments !== undefined) {
//       continue;
//     } else {
//       return false;
//     }
//   }
//   return true;
// }

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
