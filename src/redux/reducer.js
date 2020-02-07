import { ADD_USER_SUCCESS } from './actionTypes';

const initialState = {
    loading: false,
    error: '',
    users: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_USER_SUCCESS:{
            return {
                ...state,
                loading: false,
                users: [...state.users, action.payload]
            }
        }
        default: return state
    }
}

export default reducer;