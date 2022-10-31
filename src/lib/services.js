import { appendParams } from "./util";

/*
 * Each function corresponds to an API
 * Refer to API file for details of each API
 */
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

export const fyVisionsNums = () => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/fyVisionsNums'), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const vuceptorList = () => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/vuceptorList'), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const readVUAttendance = (inputs = {}) => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/readVUAttendance', inputs), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const deleteVUAttendance = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/deleteVUAttendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const getVUAttendanceVisionsList = () => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/getVUAttendanceVisionsList', {}), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const getVUAttendanceEventsList = () => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/getVUAttendanceEventsList', {}), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const exportVUAttendance = () => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/exportVUAttendance', {}), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const editVUAttendance = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/editVUAttendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const deleteFyAttendance = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/deleteFyAttendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const editFyAttendance = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/editFyAttendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const exportFyAttendance = () => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/exportFyAttendance', {}), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const readFyAttendance = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/readFyAttendance', inputs), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const getFyAttendanceEventsList = () => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/getFyAttendanceEventsList', {}), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const getFyAttendanceVisionsList = () => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/getFyAttendanceVisionsList', {}), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}