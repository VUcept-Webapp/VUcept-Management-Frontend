import styles from './index.module.css';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import Select from 'react-select';
import Creatable, { useCreatable } from 'react-select/creatable';
import { ATTENDANCE_STATUS_OPTIONS } from '../../lib/constants';
import { getAttendanceStatusStyle } from '../../lib/util';
const cx = classNames.bind(styles);

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
        className={cx(styles.but)}
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
})