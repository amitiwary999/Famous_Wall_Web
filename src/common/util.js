import { store } from 'react-notifications-component';
import firebase from '../firebase/Firebase';

export const IMAGE_MEDIA = 'image';
export const VIDEO_MEDIA = 'video';
export const MUSIC_MEDIA = 'audio';
export const PENDING = 'pending';
export const SUCCESS = 'success';
export const FAILURE = 'failure';

export const getHash = (input) => {
  let hash = 0; const
    len = input.length;
  for (let i = 0; i < len; i++) {
    hash = ((hash << 5) - hash) + input.charCodeAt(i);
    hash |= 0; // to 32bit integer
  }
  return hash;
};

export const authToken = () => new Promise(((resolve, reject) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null && user != undefined) {
      user.getIdToken().then((token) => {
        if (token != null && token !== undefined) {
          const tokenAndUserId = {
            userId: user.uid,
            token,
          };
          resolve(tokenAndUserId);
        } else {
          reject(Error('token null'));
        }
      });
    } else {
      reject(Error('token null'));
    }
  });
}));

export const notify = (msg, type, title = '') => {
  store.addNotification({
    title: title || (type == 'success' ? 'Awesome' : 'Error'),
    message: msg,
    type,
    insert: 'bottom',
    container: 'bottom-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 5000,
    },
  });
};

export const uploadMedia = (selectedMediaFile, mediaType) => new Promise((resolve, reject) => {
  const time = new Date().getTime();
  console.log(selectedMediaFile);
  const storage = firebase.storage();
  const uploadTask = storage.ref(`${mediaType}/${time + selectedMediaFile.name}`).put(selectedMediaFile);
  uploadTask.on(
    'state_changed',
    (snapshot) => { },
    (error) => {
      reject(error);
    },
    () => {
      storage
        .ref(mediaType)
        .child(time + selectedMediaFile.name)
        .getDownloadURL()
        .then((url) => {
          resolve(url);
        })
        .catch((err) => {
          reject(err);
        });
    },
  );
});

export const generateProfileId = (emailId) => emailId.toLowerCase().split('@')[0] + new Date().getTime();
