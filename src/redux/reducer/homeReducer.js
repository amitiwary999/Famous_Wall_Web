const INITIAL_STATE = {
    famousPosts: [],
    lastItem: null,
    hasMoreItems: true
}

export const homeReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {
      case "LOADED_NEW_POSTS":
          return {...state, famousPosts: {...state.famousPosts, payload}}

      case 'UPDATE_LAST_ITEM':
          return {...state, lastItem: payload}
          
      case 'NO_MORE_ITEM':
          return {...state, hasMoreItems: payload}    

      default:
          return state;    
    }

}