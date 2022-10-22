import styles from './index.module.css';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
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
        onClick,
    } = props;

    const [selected, setSelected] = useState({ label: val, value: val });
    const onChange = (option) => {
        ref.current[rowI].attendance = option.value;
        setSelected(option);
    }

    return <div
        className={cx(styles.but, className)}
        style={style}
        onClick={onClick}
    >
        <Creatable
            value={selected}
            onChange={onChange}
            options={ATTENDANCE_STATUS_OPTIONS}
            styles={getAttendanceStatusStyle(selected?.value)}
            menuPortalTarget={document.body}
            menuPlacement='auto'
            isCre
        />
    </div>;
});

LogButton.propTypes = {
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
    val: PropTypes.string.isRequired,
    rowI: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired // (event) => void
};