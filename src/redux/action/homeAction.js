import axios from 'axios'
import firebase from '../../firebase/Firebase'

export const fetchFamousPosts = (lastItemId, token) => dispatch => {
    dispatch({type: 'LOAD_NEW_POSTS_PENDING'})
    axios.defaults.headers.common['Authorization'] = token;
    let data = {
        nextKey: lastItemId,
        limit: 20
    }
    axios.post('getBlogSql', data).then(res => {
       // console.log("res "+JSON.stringify(res.data))
        if(res && res.data){
            dispatch({ type: 'LOAD_NEW_POSTS_SUCCESS' })
            let data = res.data;
            if(data.length>0){
                let lastItemPostId = data[data.length-1].postId
                dispatch({type: 'LOADED_NEW_POSTS', payload: data})
                dispatch({type: 'UPDATE_LAST_ITEM', payload: lastItemPostId})
            }else{
                dispatch({type: 'NO_MORE_ITEM'})
            }
        }else{
            dispatch({ type: 'LOAD_NEW_POSTS_FAILURE' })
        }
    }).catch(error => {
        dispatch({ type: 'LOAD_NEW_POSTS_FAILURE' })
        console.log(error)
    })
}