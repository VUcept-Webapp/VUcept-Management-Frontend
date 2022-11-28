import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import React from 'react';
const cx = classNames.bind(styles);

// A time picker
export const TimePicker = React.forwardRef((props, ref) => {
    const {
        className,
        time,
        readOnly = false
    } = props;
    const [h, setH] = useState(time.split(':')[0]);
    const [m, setM] = useState(time.split(':')[1]);

    useEffect(() => {
        ref.current = h + ':' + m;
    }, [h, m]);

    const onChangeH = (e) => {
        let val = parseInt(e.target.value);
        if(!Number.isNaN(val)) {
            if(val >= 24) val = '23';
            else if(val < 0) val = '00';
            else if(val < 10) val = '0' + val;
            else val = val.toString();
            setH(val);
        }
    }

    const onChangeM = (e) => {
        let val = parseInt(e.target.value);
        if(!Number.isNaN(val)) {
            if(val >= 60) val = '00';
            else if(val < 0) val = '00';
            else if(val < 10) val = '0' + val;
            else val = val.toString();
            setM(val);
        }
    }

    return <div className={cx(styles.timePicker, className)}>
        <input 
            className={cx(styles.timeInput)}
            value={h}
            onChange={onChangeH}
            readOnly={readOnly}
        />
        <span>:</span>
        <input
            className={cx(styles.timeInput)}
            value={m}
            onChange={onChangeM}
            readOnly={readOnly}
        />
    </div>
});