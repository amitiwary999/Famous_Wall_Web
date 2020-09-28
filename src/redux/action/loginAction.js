import axios from "axios";
import firebase from '../../firebase/Firebase'

export const setUser = (token, data) => dispatch => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.post('setUserSql', data).then(res => {
        dispatch({type: 'LOGIN_SUCCESS'})
    }).catch(error => {
        console.log(error);
        dispatch({type: 'LOGIN_FAILED'})
        logout()
    })
}

const logout = () => {
    firebase
        .auth()
        .signOut()
        .then(() => {})
            .catch((error) => {
              //save in local storage so that user can't use it until it saved
            console.log("login signout err ", error);
        });
}