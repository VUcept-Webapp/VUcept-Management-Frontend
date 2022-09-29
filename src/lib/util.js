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

export const toUpperRows = (rows) => {
    return rows.map(row => {
        let r = { ...row };
        if(r.type) {
            const original = r.type;
            if(original === 'vuceptor') r.type = 'VUceptor';
            else if(original === 'board') r.type = 'Board';
            else if(original === 'advisor') r.type = 'Advisor';
        }
        if(r.status) {
            const original = r.status;
            if(original === 'registered') r.status = 'Registered';
            else if(original === 'unregistered') r.status = 'Unregistered';
        }
        return r;
    })
}

export const importUsersToJSON = (data) => {
    try {
        if(data?.length === 0) return {};
        let keys = {};
        for(let i = 0; i < data[0].length; ++i) {
            keys[i.toString()] = data[0][i];
        }
        let res = [];
        for(let r = 1; r < data.length; ++r) {
            let obj = {};
            for(let c = 0; c < data[r].length; ++c) {
                obj[keys[c.toString()]] = data[r][c];
            }
            res.push(obj);
        }
        return res;
    } catch(err) {
        return 'error';
    }
}