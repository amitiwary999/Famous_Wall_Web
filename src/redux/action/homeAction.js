import axios from 'axios'
import firebase from '../../firebase/Firebase'

export const fetchFamousPosts = (lastItem) => dispatch => {
    firebase.firestore().collection('famous_post').orderBy('createdAt', 'desc').startAfter(lastItem).limit(30).get()
    .then(snapShot => {
        console.log("snapshot "+snapShot)
        let datas = []
        let lastVisible = null
        if(snapShot.size>0){
            lastVisible = snapShot.docs[snapShot.docs.length-1];
        }else{
            dispatch({type: 'NO_MORE_ITEM', payload: false})
        }
        snapShot.forEach(doc => {
            let data = doc.data();
            console.log("data "+data)
            datas.push(data)
        })

        dispatch({ type: "LOADED_NEW_POSTS", payload: datas });
        dispatch({ type: 'UPDATE_LAST_ITEM', payload: lastVisible})
    }).catch(error => {
        console.log(error)
    })
}

export const addPost = (data) => {
    firebase.firestore().collection('famous_posts').add(data).then(() => {
        console.log("success add post")
    }).catch(error => {
        console.log(error)
    })
}