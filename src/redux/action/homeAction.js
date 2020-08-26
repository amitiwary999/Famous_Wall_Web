import axios from 'axios'
import firebase from '../../firebase/Firebase'

export const fetchFamousPosts = (data, token) => {
    
}

export const addPost = (data) => {
    firebase.firestore().collection('famous_posts').add(data)
}