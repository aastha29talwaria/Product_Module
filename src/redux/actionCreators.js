import { ADD_USER_SUCCESS } from './actionTypes';


export const addUserSuccess = (user) => {
    return {
        type: ADD_USER_SUCCESS,
        payload: user
    }
}

