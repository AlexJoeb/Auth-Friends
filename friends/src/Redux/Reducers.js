import {
    FETCH_FRIENDS_START, 
    FETCH_FRIENDS_SUCCESS, 
    FETCH_FRIENDS_FAIL,

    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './Actions';

const initState = {
    fetchingFriends: false,
    loggingIn: false,
    user: {
        token: null,
        username: '',
    },
    friends: [],
    errorCode: NaN,
    errorMessage: '',
}

export default (state = initState, action) => {
    switch (action.type) {
        case FETCH_FRIENDS_START:
            return {
                ...state,
                fetchingFriends: true,
            }
        case FETCH_FRIENDS_SUCCESS:
            return {
                ...state,
                fetchingFriends: false,
                friends: action.payload,
                errorCode: NaN,
                errorMessage: '',
            }
        case FETCH_FRIENDS_FAIL:
            return {
                ...state,
                fetchingFriends: false,
                errorCode: action.payload.code,
                errorMessage: action.payload.message
            }
        case LOGIN_START:
            return {
                ...state,
                loggingIn: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                user: {
                    token: action.payload.token,
                    username: action.payload.username,
                },
                errorCode: NaN,
                errorMessage: '',
            }
        case LOGIN_FAIL:
            return {
                ...state,
                loggingIn: false,
                errorCode: action.payload.code,
                errorMessage: action.payload.message
            }
        default:
            return state;
    }
}