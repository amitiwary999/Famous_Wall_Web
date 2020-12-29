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

export const fetchSelfProfile = (token) => new Promise((resolve, reject) =>{
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.get('profile')
    .then((res) => {
      if (res && res.data) {
        resolve(res.data);
      } else {
        reject(Error('no user data'));
      }
    })
    .catch((error) => {
      console.error(error);
      reject(error);
    });
});

export const addUserProfile = (token, data) => new Promise((resolve, reject) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.post('profile', data)
    .then((res) => {
      resolve('success');
    })
    .catch((error) => {
      reject(error);
    });
});

export const updateProfile = (token, data) => new Promise((resolve, reject) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.patch('profile', data)
    .then((res) => {
      resolve('success');
    })
    .catch((error) => {
      reject(error);
    });
});
