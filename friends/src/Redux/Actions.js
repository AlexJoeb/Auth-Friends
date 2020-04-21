import axios from 'axios';

export const FETCH_FRIENDS_START = `FETCH_FRIENDS_START`;
export const FETCH_FRIENDS_SUCCESS = `FETCH_FRIENDS_SUCCESS`;
export const FETCH_FRIENDS_FAIL = `FETCH_FRIENDS_FAIL`;

export const LOGIN_START = `LOGIN_START`;
export const LOGIN_SUCCESS = `LOGIN_SUCCESS`;
export const LOGIN_FAIL = `LOGIN_FAIL`;

export const login = (username, password) => dispatch => {
    dispatch({ type: LOGIN_START });
    axios.post('http://localhost:5000/api/login', {
        username, password
    })
        .then(({ data }) => {
            dispatch({
                type: LOGIN_SUCCESS, payload: {
                    token: data.payload,
                    username,
                }
            });
        })
        .catch(error => {
            const message = error.message;
            const code = parseInt(message.split(" code ")[1]);
            dispatch({
                type: LOGIN_FAIL, payload: {
                    code, message
                }
            });
        })
}

export const fetchFriends = () => dispatch => {
    console.log("here");
    dispatch({ type: FETCH_FRIENDS_START });
    axios.get('http://localhost:5000/api/friends')
        .then(({ data }) => {
            dispatch({ type: FETCH_FRIENDS_SUCCESS });
            console.log(data);
        })
        .catch(error => {
            dispatch({
                type: FETCH_FRIENDS_FAIL, payload: {
                    code: 901,
                    message: "Friend Fetch Failed",
                }
            });
            console.log(error);
        })
}