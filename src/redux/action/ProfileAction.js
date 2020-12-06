/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const fetchProfile = (data) => new Promise((resolve, reject) => {
  const requestBody = { params: data };
  axios.get('profile', requestBody)
    .then((res) => {
      if (res && res.data) {
        resolve(res.data);
      } else {
        reject(Error('no user data'));
      }
    })
    .catch((error) => {
      reject(error);
    });
});
