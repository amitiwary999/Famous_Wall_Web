import axios from 'axios'
import firebase from '../../firebase/Firebase'

export const fetchFamousPosts = (lastItemId, token) => dispatch => {
    axios.defaults.headers.common['Authorization'] = token;
    let data = {
        nextKey: lastItemId,
        limit: 20
    }
    axios.post('getBlogSql', data).then(res => {
        console.log("res "+res)
        if(res && res.data){
            let data = res.data;
            if(data.size>0){
                let lastItemPostId = data[data.size-1].postId
                dispatch({type: 'LOADED_NEW_POSTS', payload: data})
                dispatch({type: 'UPDATE_LAST_ITEM', payload: lastItemPostId})
            }else{
                dispatch({type: 'NO_MORE_ITEM'})
            }
        }
    }).catch(error => {
        console.log(error)
    })
}