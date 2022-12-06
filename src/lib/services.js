import { appendParams } from "./util";

/*
 * Each function corresponds to an API
 * Refer to API file for details of each API
 */
export const sendVerificationEmail = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/sendVerificationEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const signUp = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/signUp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const login = (inputs = {}) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const changePassword = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/changePassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
}

export const getAccessToken = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/getAccessToken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const getUserFromToken = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/getUserFromToken', inputs), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}