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

export const fetchSelfProfile = (token) => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.get('profile')
    .then((res) => {
      if (res && res.data) {
        dispatch({ type: 'FETCH_SELF_PROFILE_SUCCESS', payload: res.data });
      } else {
        dispatch({ type: 'FETCH_SELF_PROFILE_FAILED' });
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch({ type: 'FETCH_SELF_PROFILE_FAILED' });
    });
};
