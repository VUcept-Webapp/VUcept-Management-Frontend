import { EVENT, SORT } from "./constants";

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
            else if(original === 'absent') r.status = 'Absent';
            else if(original === 'attended') r.status = 'Attended';
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
    if(val === 'Attended') {
        backgroundColor = '#8BA18E';
        color = '#FFFFFF';
    }
    else if(val === 'Absent') {
        backgroundColor = '#EC6648';
        color = '#FFFFFF';
    }
    else if(val === 'Unlogged') {
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
 * Calculate the aligned left value
 * @param {Object} input an object containing the params
 * @returns the calculated aligned left
 */
export const getAlignedLeft = ({ newLeft, left, columnWidth }) => {
    if((newLeft - 40) % columnWidth < 10) {
        const tmp = Math.floor((newLeft - 40) / columnWidth);
        return tmp * columnWidth + 40;
    }
    return left;
}

/**
 * Optimize the dragging event, prevent unnecessary rerendering
 * @param {Object} prevProps previous props
 * @param {Object} nextProps next props
 * @returns true if rerender
 */
export const nonDraggingPropsChange = (prevProps, nextProps) => {
    for(const key in prevProps) {
        if(key === 'hoverCol') continue;
        if(key === 'dragging') continue;
        if(prevProps[key] !== nextProps[key]) return true;
    }
    return false;
}

/**
 * Capitalize user type
 * @param {String} type original user type
 * @returns capitalized user type
 */
export const capitalizeUserType = (type) => {
    if(type === 'vuceptor') return 'VUceptor';
    if(type === 'board') return 'Board';
    if(type === 'advisor') return 'Advisor';
    else return type;
}

/**
 * Get mySQL sort
 * @param {Number} sort sort code in number
 * @returns mySQL sort
 */
export const getSortParam = (sort) => {
    if(sort === SORT.NO_SORT) return null;
    else if(sort === SORT.ASCEND) return 'ASC';
    else return 'DESC';
}

/**
 * Get the value of the options for react-select
 * @param {Array} options options for react-select
 * @returns an array of only the value of each option
 */
export const getOptionValue = (options) => {
    return options.map(option => option.value.toLowerCase());
}

/**
 * Update the sort order
 * @param {Object} param an object containing the original sort order array, value of the current sort, and key of the current sort
 */
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

/**
 * Get the debounced version of a function
 * @param {Function} handler the function
 * @param {Number} delay the deley time
 * @returns the debounced function
 */
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

/**
 * Format a getTime() string into yyyy-mm-dd
 * @param {String} dateStr the result of Date.prototype.getTime()
 * @returns {String} yyyy-mm-dd
 */
export const formatGetTime = (dateStr) => {
    let d = new Date(dateStr);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

/**
 * Turn yyyy-mm-dd into a Date object
 * @param {String} dateStr yyyy-mm-dd
 * @returns {Object} a Date object
 */
 export const yyyymmddToDateObj = (dateStr) => {
    const [y, m, d] = dateStr.split('-').map(x => parseInt(x));
    return new Date(y, m - 1, d);
}

/**
 * Get difference between two times in minutes
 * @param {String} start hh:mm
 * @param {String} end hh:mm
 * @returns {Object} time difference in minutes
 */
 export const getMinDiff = (start, end) => {
    const [hStart, mStart] = start.split(':').map(x => parseInt(x));
    const [hEnd, mEnd] = end.split(':').map(x => parseInt(x));
    if(mStart <= mEnd) return 60 * (hEnd - hStart) + mEnd - mStart;
    else return 60 * (hEnd - hStart - 1) + mEnd - mStart + 60;
}

/**
 * Get event Height
 * @param {Number} timeLength time length of event in minutes
 * @returns {Number} height in pixel
 */
 export const getEventHeight = (timeLength) => {
    return Math.round((timeLength / 1440) * (60 * 24));
}

/**
 * Get day of the week
 * @param {Object} date a JS date object
 * @returns {Number} day of the week
 */
 export const getDay = (date) => {
    return date.getDay();
}

/**
 * Add a few days to a date
 * @param {Object} date a JS date object
 * @param {number} days days to be added
 * @returns {Object} a new Date object
 */
 export const addDays = (date, days) => {
    const d = new Date(date.getTime());
    d.setDate(d.getDate() + days);
    return d;
}

/**
 * Get top of an Event component
 * @param {String} startTime hh:mm
 * @returns {Number} top in pixels
 */
 export const getEventTop = (startTime) => {
    const [h, m] = startTime.split(':').map(x => parseInt(x));
    return (h + 1) * 60 + m;
}

/**
 * Get the left position of EventDetails
 * @param {{Number}} eventX left position of the Event component
 * @param {{Number}} eventWidth width of the Event component
 * @param {{Number}} screenWidth width of the screen
 * @returns 
 */
export const getEventPopUpLeft = ({ eventX, eventWidth, screenWidth }) => {
    if(eventX - EVENT.POPUP_WIDTH >= 5) return eventX - EVENT.POPUP_WIDTH;
    if(eventX + eventWidth + EVENT.POPUP_WIDTH + 5 <= screenWidth) return eventX + eventWidth;
    else return null;
}

/**
 * Get the left position of EventDetails
 * @param {{Number}} eventY top position of the Event component
 * @param {{Number}} eventHeight height of the Event component
 * @param {{Number}} screenHeight height of the screen
 * @returns 
 */
 export const getEventPopUpTop = ({ eventY, eventHeight, screenHeight }) => {
    let mid = eventY + 0.5 * eventHeight;
    console.log(mid, screenHeight);
    if(mid < 170) return 200;
    else if(mid + 170 > screenHeight) return screenHeight - 200;
    return mid;
}

/**
 * Compare two { startTime, endTime } 
 * @param {Object} time1 the first { startTime, endTime }
 * @param {Object} time2 the second { startTime, endTime }
 * @returns true if time1 comes before time2
 */
 export const earlierThan = (time1, time2) => {
    const [h1, m1] = time1.split(':').map(x => parseInt(x));
    const [h2, m2] = time2.split(':').map(x => parseInt(x));
    if(h1 > h2) return false;
    else if(h1 < h2) return true;
    return m1 < m2;
}

/**
 * Transform an input into hh:mm
 * @param {Object} time { hour, minute }
 * @returns hh:mm
 */
 export const formatTime = ({ hour, min }) => {
    let hourStr = hour.toString(), minStr = min.toString();
    if(hourStr.length === 1) hourStr = '0' + hourStr;
    if(minStr.length === 1) minStr = '0' + minStr;
    return hourStr + ':' + minStr;
}


/**
 * Add 30 minutes to hh:mm
 * @param {String} time hh:mm
 * @returns hh:mm + 30 minutes
 */
 export const addHalfAnHour = (time) => {
    let [h, m] = time.split(':').map(x => parseInt(x));
    if(m === 0) {
        h = h.toString();
        if(h.length === 1) h = '0' + h;
        m = '30';
    }
    else {
        h++;
        h = h.toString();
        if(h.length === 1) h = '0' + h;
        m = '00';
    }
    return h + ':' + m;
}

/**
 * Get the width of an Event component in pixel
 * @param {Array} eventTimes an Array of { startTime, endTime }
 * @param {Object} event event time info in { startTime, endTime }
 * @param {Number} columnWidth width of a column in pixel
 * @param {String} eventId id of an event
 * @returns width of an Event component
 */
 export const getEventWidth = (eventTimes, event, columnWidth, eventId) => {
    let overlaps = [];
    const { startTime: curStart, endTime: curEnd } = event;
    for(const { startTime, endTime, eventId } of eventTimes) {
        if(earlierThan(curEnd, startTime)) continue;
        if(earlierThan(endTime, curStart)) continue;
        overlaps.push(eventId);
    }
    let idx = overlaps.indexOf(eventId);
    let width = columnWidth / (overlaps.length || 0);
    let left = (idx === -1 ? 0 : idx) * width;
    return { width, left };
}