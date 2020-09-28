import { FAILURE, PENDING, SUCCESS } from "../../common/util";

const INITIAL_STATE = {
    loginStatus: ''
}

export const loginReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type){
        case 'LOGIN_FAILED':
            return {...state, loginStatus: FAILURE}

        case 'LOGIN_SUCCESS':
            return {...state, loginStatus: SUCCESS}  
            
        case 'LOGIN_PENDING':
            return {...state, loginStatus: PENDING}    

        default:
            return state    
    }
}