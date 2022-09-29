export const appendParams = (url, params) => {
    let res = url + '?';
    const keys = Object.keys(params);
    for(const key of keys) {
        if(params.hasOwnProperty(key)) {
            res += key + '=' + params[key] + '&';
        }
    }
    return res.substring(0, res.length - 1);
}