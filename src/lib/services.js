export const viewAllUsers = () => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/viewallusers', {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}