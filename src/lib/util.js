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

export const getAttendanceStatusStyle = (val) => {
    let backgroundColor = "";
    let color = "";
    if(val === 'Present') {
        backgroundColor = '#8BA18E';
        color = '#FFFFFF';
    }
    else if(val === 'Absent') {
        backgroundColor = '#EC6648';
        color = '#FFFFFF';
    }
    else if(val === 'Excused') {
        backgroundColor = '#ECB748';
        color = '#FFFFFF';
    }
    else if(val === 'Select') {
        backgroundColor = '#E4E4E4';
        color = '#000000';
    }
    else {
        backgroundColor = '#3E3E3E';
        color = '#FFFFFF';
    }
    return {
        container: (provided) => ({
            ...provided,
            width: "90px",
            minHeight: `20px`,
            height: `20px`,
            lineHeight: '20px',
            fontSize: '13.3px',
            fontFamily: 'Open Sans, sans-serif',
            letterSpacing: '0.6px',
            textAlign: 'center',
            color
        }),
        control: (provided) => ({
            ...provided,
            borderRadius: '15px',
            minHeight: `20px`,
            height: `20px`,
            backgroundColor,
            color
        }),
        singleValue: (provided) => ({
            ...provided,
            color
        }),
        option: (provided) => ({
            ...provided,
            fontSize: '13.3px',
            fontFamily: 'Open Sans, sans-serif',
            letterSpacing: '0.6px',
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            padding: '0'
        }),
        input: (provided) => ({
            ...provided,
            height: '20px',
            lineHeight: '20px',
            padding: '0 5px',
            overflow: 'hidden',
            textOverflow: 'hidden',
            marginTop: '-1px',
            color,
        }),
        placeholder: () => ({
            display: 'none'
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            display: 'none'
        }),
        menuPortal: (provided, state) => ({ 
            ...provided,
            zIndex: 1000
        })
    }
}

export const checkInputRows = (inputRows) => {
    for(const r of inputRows) {
        if(r.attendance === 'Select') return false;
    }
    return true;
}