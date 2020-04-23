import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { AxiosWithAuth, AxiosWithoutAuth } from './AxiosWithAuth';

export const FETCH_FRIENDS_START = `FETCH_FRIENDS_START`;
export const FETCH_FRIENDS_SUCCESS = `FETCH_FRIENDS_SUCCESS`;
export const FETCH_FRIENDS_FAIL = `FETCH_FRIENDS_FAIL`;

export const LOGIN_START = `LOGIN_START`;
export const LOGIN_SUCCESS = `LOGIN_SUCCESS`;
export const LOGIN_FAIL = `LOGIN_FAIL`;

export const LOGOUT = `LOGOUT`;

export const ADD_FRIEND_SUCCESS = `ADD_FRIEND_SUCCESS`;
export const ADD_FRIEND_ERROR = `ADD_FRIEND_ERROR`;

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
}

export const addFriend = (username, age, email) => (dispatch, getState )=> {
    AxiosWithAuth().post(`/api/friends`)
        .then(({ data }) => {
            dispatch({
                type: ADD_FRIEND_SUCCESS,
                payload: [{
                    id: uuidv4(),
                    name: username,
                    age,
                    email
                }]
            })
        })
        .catch(({ message }) => {
            const code = parseInt(message.split(" code ")[1]);
            dispatch({
                type: ADD_FRIEND_ERROR,
                payload: {
                    code,
                    message
                }
            })
        })
}

export const login = (username, password) => dispatch => {
    dispatch({ type: LOGIN_START });
    AxiosWithoutAuth().post('api/login', {
        username, password
    })
        .then(({ data }) => {
            dispatch({
                type: LOGIN_SUCCESS, payload: {
                    token: data.payload,
                    username,
                }
            });
            localStorage.setItem("token", `${data.payload}`);
            localStorage.setItem("username", `${username}`);
        })
        .catch(({ message }) => {
            const code = parseInt(message.split(" code ")[1]);
            dispatch({
                type: LOGIN_FAIL, payload: {
                    code, message
                }
            });
        })
}

export const fetchFriends = () => dispatch => {
    console.log("hello")
    dispatch({ type: FETCH_FRIENDS_START });
    AxiosWithAuth().get('http://localhost:5000/api/friends')
        .then(({ data }) => {
            dispatch({ type: FETCH_FRIENDS_SUCCESS, payload: data });
        })
        .catch(({ message }) => {
            const code = parseInt(message.split(" code ")[1]);
            dispatch({
                type: FETCH_FRIENDS_FAIL, payload: {
                    code, message
                }
            });
        })
}