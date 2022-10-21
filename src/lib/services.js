import { appendParams } from "./util";

export const readUser = (inputs = {}) => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/readUser', inputs), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const updateUser = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/updateUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const createUser = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/createUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const deleteUser = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/deleteUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const userLoadfromcsv = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/userLoadfromcsv', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const resetUsers = () => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/resetUsers', {
            method: 'POST',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

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
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/login', inputs), {
            method: 'GET',
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

export const visionsNums = () => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/visionsNums'), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const createFy = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/createFy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
}

export const readFy = (inputs = {}) => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/readFy', inputs), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const updateFy = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/updateFy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const deleteFy = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/deleteFy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const resetFy = () => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/resetFy', {
            method: 'POST',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const fyLoadfromcsv = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/fyLoadfromcsv', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}