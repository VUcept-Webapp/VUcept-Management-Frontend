import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
const cx = classNames.bind(styles);

export const AuthButton = (props) => {
    const {
        className,
        style,
        label,
        onClick,
    } = props;
    return <div
        className={cx(styles.button, className)}
        style={style}
        onClick={onClick}
    >
        {label}
    </div>;
}