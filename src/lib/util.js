import { SORT } from "./constants";

/**
 * Construct the url for GET request
 * @param {string} url original url
 * @param {Object} params params to be appended to url
 * @returns {String} url appended with params
 */
export const appendParams = (url, params = {}) => {
    let res = url + '?';
    const keys = Object.keys(params);
    for(const key of keys) {
        if(params.hasOwnProperty(key)) {
            res += key + '=' + params[key] + '&';
        }
    }
    return res.substring(0, res.length - 1);
}

/**
 * Capitalize table content
 * @param {Array} rows rows of the table
 * @returns {Array} capitalized rows
 */
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

/**
 * Parse csv file into JSON object
 * @param {Array} data csv file
 * @returns {Object} JSON version of the file
 */
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

/**
 * Get the style for each attendance status
 * @param {String} val attendance status
 * @returns {Object} style for the react-select component
 */
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

/**
 * Check if all rows are logged
 * @param {Array} inputRows rows of attendance logging
 * @returns {Boolean} true if all rows are logged
 */
export const checkInputRows = (inputRows) => {
    for(const r of inputRows) {
        if(r.attendance === 'Select') return false;
    }
    return true;
}

/**
 * Get the Monday of the week
 * @param {Date} d Date object of the week
 * @returns {Date} the Monday of the week
 */
export const getMonday = (d) => {
    const date = new Date(d.getTime());
    let day = date.getDay() || 7;  
    if(day !== 1) date.setHours(-24 * (day - 1)); 
    return date;
}

/**
 * Get the Sunday of the week
 * @param {Date} d Date object of the week
 * @returns {Date} the Sunday of the week
 */
export const getSunday = (d) => {
    const date = new Date(d.getTime());
    const first = date.getDate() - date.getDay() + 1;
    const last = first + 6;
    date.setDate(last);
    return date;
}

/**
 * Get the Monday of last week
 * @param {Date} d Date object of the week
 * @returns {Date} the Monday of last week
 */
export const getPrevMonday = (d) => {
    const date = new Date(d.getTime());
    date.setDate(date.getDate() - (date.getDay() + 6) % 7);
    return date;
}

/**
 * Get the Monday of next week
 * @param {Date} d Date object of the week
 * @returns {Date} the Monday of next week
 */
export const getNextMonday = (d) => {
    const date = new Date(date.getTime());
    date.setDate(date.getDate() + ((7 - date.getDay()) % 7 + 1) % 7);
    return date;
}

/**
 * Get the width of each calendar column in pixel
 * @param {Number} containerWidth width of the container in pixel
 * @returns {Number} the width of each calendar column in pixel
 */
export const getCalendarColumnWidth = (containerWidth = 0) => {
    let width = (containerWidth - 40) / 7 + 1;
    return width > 80 ? width : 80;
}

/**
 * Get the left in pixel based on day
 * @param {Object} params day and column width
 * @returns {Number} the left in pixel based on day
 */
export const getLeftFromDay = ({ day, columnWidth }) => {
    return 40 + (day - 1) * columnWidth;
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const getAlignedLeft = ({ newLeft, left, columnWidth }) => {
    if((newLeft - 40) % columnWidth < 10) {
        const tmp = Math.floor((newLeft - 40) / columnWidth);
        return tmp * columnWidth + 40;
    }
    return left;
}

export const nonDraggingPropsChange = (prevProps, nextProps) => {
    for(const key in prevProps) {
        if(key === 'hoverCol') continue;
        if(key === 'dragging') continue;
        if(prevProps[key] !== nextProps[key]) return true;
    }
    return false;
}

export const capitalizeUserType = (type) => {
    if(type === 'vuceptor') return 'VUceptor';
    if(type === 'board') return 'Board';
    if(type === 'advisor') return 'Advisor';
    else return type;
}

export const getSortParam = (sort) => {
    if(sort === SORT.NO_SORT) return null;
    else if(sort === SORT.ASCEND) return 'ASC';
    else return 'DESC';
}

export const getOptionValue = (options) => {
    return options.map(option => option.value.toLowerCase());
}

export const updateOrder = ({ order, value, key }) => {
    const index = order.indexOf(key);
    if(value === SORT.NO_SORT) {
        if(index !== -1) order.splice(index, 1);
    }
    else {
        if(index !== -1) order.splice(index, 1);
        order.unshift(key);
    }
}

export const debounce = (handler, delay = 500) => {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            handler.apply(this, args);
            timer = null;
        }, delay);
    }
}