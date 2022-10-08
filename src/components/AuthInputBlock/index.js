import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
const cx = classNames.bind(styles);

export const AuthInputBlock = React.forwardRef((props, ref) => {
    const {
        label,
        containerClassName,
        containerStyle,
        value,
        onChange,
    } = props;
    
    return <div
        className={cx(styles.inputBlock, containerClassName)}
        style={containerStyle}
    >
        <p
            className={cx(styles.label)}
        >
            {label || ""}
        </p>
        <input 
            className={cx(styles.input)}
            value={value}
            onChange={(event) => onChange(event.target.value)}
        />
    </div>
})