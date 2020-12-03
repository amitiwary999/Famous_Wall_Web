import axios from 'axios';
import firebase from '../../firebase/Firebase';

export const fetchFamousPosts = (lastItemId, token) => (dispatch) => {
  dispatch({ type: 'LOAD_NEW_POSTS_PENDING' });
  if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const requestData = {
    nextKey: lastItemId,
    limit: 20,
  };
  const requestBody = { params: requestData };
  axios.get('famousPost', requestBody).then((res) => {
    // console.log("res "+JSON.stringify(res.data))
    if (res && res.data) {
      dispatch({ type: 'LOAD_NEW_POSTS_SUCCESS' });
      const { data } = res;
      if (data.length > 0) {
        const lastItemPostId = data[data.length - 1].postId;
        dispatch({ type: 'LOADED_NEW_POSTS', payload: data });
        dispatch({ type: 'UPDATE_LAST_ITEM', payload: lastItemPostId });
      } else {
        dispatch({ type: 'NO_MORE_ITEM' });
      }
    } else {
      dispatch({ type: 'LOAD_NEW_POSTS_FAILURE' });
    }
  }).catch((error) => {
    dispatch({ type: 'LOAD_NEW_POSTS_FAILURE' });
    console.log(error);
  });
};

export const likeOrUnlikePost = (famousUserId, incr, pos, token) => (dispatch) => {
  dispatch({ type: 'POST_LIKE_SUCCESS', payload: { userId: famousUserId, pos } });

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const data = {
    userId: famousUserId,
    increment: incr,
  };

  axios.post('setPostLikeSql', data).then((res) => {
    if (res && res.data) {

    } else {
      dispatch({ type: 'POST_LIKE_FAILED', payload: { userId: famousUserId, pos } });
    }
  }).catch((error) => {
    console.log(`error ${error} ${JSON.stringify(error.response)}`);
    dispatch({ type: 'POST_LIKE_FAILED', payload: { userId: famousUserId, pos } });
  });
};

// received
export const fetchVideoRequest = (token) => new Promise((resolve, reject) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios
    .get('receivedRequest')
    .then((res) => {
      if (res && res.data) {
        resolve(res.data);
      } else {
        reject('no data');
      }
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
});

// sent
export const fetchVideoInvite = (token) => new Promise((resolve, reject) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios
    .get('sendRequest')
    .then((res) => {
      if (res && res.data) {
        resolve(res.data);
      } else {
        reject('no data');
      }
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
});

// data = {inviteeId: to whom wamt to send invite, status: 0-> request, 1->accept, 2->reject}
export const postVideoCallRequest = (token, data) => new Promise((resolve, reject) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.post('sendRequest', data)
    .then((res) => {
      resolve('success');
    }).catch((error) => {
      reject(error);
    });
});

export const deleteVideoCallRequest = (token, data) => new Promise((resolve, reject) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const requestBody = { data };
  axios.delete('sendRequest', requestBody)
    .then((res) => {
      resolve('success');
    }).catch((error) => {
      reject(error);
    });
});
