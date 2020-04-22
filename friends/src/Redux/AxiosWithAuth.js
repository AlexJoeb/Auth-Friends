import { store } from '../index';
import axios from 'axios';

export function AxiosWithAuth() {
    const token = store.getState().user.token || localStorage.getItem("token") || null;
    return axios.create({
        headers: {
            Authorization: token,
        },
        baseURL: 'http://localhost:5000',
    });
};

export function AxiosWithoutAuth() {
    return axios.create({
        baseURL: 'http://localhost:5000',
    });
};