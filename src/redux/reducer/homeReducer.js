import { SUCCESS, FAILURE, PENDING } from "../../common/util";

const INITIAL_STATE = {
    famousPosts: [],
    lastItemId: '',
    hasMoreItems: true,
    loadItemStatus: ''
}

export const homeReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {
      case "LOADED_NEW_POSTS":
          console.log("fm payload "+payload.length)
          return {...state, hasMoreItems: true, famousPosts: state.famousPosts.concat(payload)}

      case 'UPDATE_LAST_ITEM':
          return {...state, lastItemId: payload}
          
      case 'NO_MORE_ITEM':
          return {...state, hasMoreItems: false}  

      case 'LOAD_NEW_POSTS_SUCCESS':
          return {...state, loadItemStatus: SUCCESS}    

        case 'LOAD_NEW_POSTS_FAILURE':
            return {...state, loadItemStatus: FAILURE}   
            
        case 'LOAD_NEW_POSTS_PENDING':
            return {...state, loadItemStatus: PENDING}    

      default:
          return state;    
    }

}