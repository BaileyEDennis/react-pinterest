import axios from 'axios';
import ApiKeys from '../apiKeys';
import { deletePin } from './pinData';

const baseUrl = ApiKeys.databaseURL;

const getBoards = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/boards.json`)
    .then((response) => {
      const boards = response.data;
      const boardsArray = [];
      if (boards) {
        Object.keys(boards).forEach((boardId) => {
          boardsArray.push(boards[boardId]);
        });
      }
      resolve(boardsArray);
    })
    .catch((error) => reject(error));
});

const getAllUserBoards = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="userId"&equalTo="${userId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    const pinResponse = response.data;
    const pinArray = [];
    if (pinResponse) {
      Object.keys(pinResponse).forEach((pin) => {
        pinArray.push(pinResponse[pin]);
      });
    }
    resolve(pinArray);
  }).catch((error) => reject(error));
});

const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards/${boardId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const deleteBoard = (boardUid) => {
  getBoardPins(boardUid)
    .then((response) => {
      response.forEach((pin) => {
        console.warn(pin.pinId);
        deletePin(pin.pinId);
      });
    })
    .then(() => {
      getSingleBoard(boardUid).then((response) => {
        axios.delete(`${baseUrl}/boards/${response.firebaseKey}.json`);
      });
    });
};

const createBoard = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/boards.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/boards/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const updateBoard = (object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/boards/${object.firebaseKey}.json`, object)
    .then(resolve).catch((error) => reject(error));
});

export {
  getBoardPins,
  getBoards,
  getSingleBoard,
  deleteBoard,
  updateBoard,
  getAllUserBoards,
  createBoard,
};
