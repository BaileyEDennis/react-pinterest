import axios from 'axios';

const baseUrl = 'https://pinterest-d6d6f.firebaseio.com/boards';

const getBoards = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}.json`)
    .then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

export default { getBoards };
