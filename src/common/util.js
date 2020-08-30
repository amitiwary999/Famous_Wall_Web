import firebase from '../firebase/Firebase';

export const IMAGE_MEDIA = 'image_media'
export const VIDEO_MEDIA = 'video_media'
export const MUSIC_MEDIA = 'music_media'
export const PENDING = 'pending'
export const SUCCESS = 'success'
export const FAILURE = 'failure'

export const getHash = input =>{
    var hash = 0, len = input.length;
    for (var i = 0; i < len; i++) {
        hash = ((hash << 5) - hash) + input.charCodeAt(i);
        hash |= 0; // to 32bit integer
    }
    return hash;
}

export const authToken = () => {
    return new Promise(function (resolve, reject) {
        firebase.auth().onAuthStateChanged(user => {
            if (user != null && user != undefined) {
                user.getIdToken().then(token => {
                    if (token != null && token !== undefined) {
                        let tokenAndUserId = {
                            userId: user.uid,
                            token: token
                        }
                        resolve(tokenAndUserId);
                    } else {
                        reject(Error('token null'));
                    }
                });
            } else {
                reject(Error('token null'));
            }
        });
    });
};