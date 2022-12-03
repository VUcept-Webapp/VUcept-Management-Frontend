import styles from './index.module.css';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Creatable from 'react-select/creatable';
import { ATTENDANCE_STATUS_OPTIONS } from '../../lib/constants';
import { getAttendanceStatusStyle } from '../../lib/util';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Button for attendance logging
export const LogButton = React.forwardRef((props, ref) => {
    const {
        className,
        style,
        val,
        rowI,
    } = props;

    const [selected, setSelected] = useState(val);
    const onChange = (option) => {
        setSelected(option.value);
        ref.current[rowI].attendance = option.value;
    }

    useEffect(() => {
        setSelected(val);
    }, [val]);

    return <div
        className={cx(styles.but, className)}
        style={style}
        data-testid='log-button'
    >
        <Creatable
            value={{ label: selected, value: selected }}
            onChange={onChange}
            options={ATTENDANCE_STATUS_OPTIONS}
            styles={getAttendanceStatusStyle(selected)}
            menuPortalTarget={document.body}
            menuPlacement='auto'
            isClearable
        />
    </div>;
});

LogButton.propTypes = {
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
    val: PropTypes.string.isRequired,
    rowI: PropTypes.number.isRequired,
};