import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Button for table
export const TableButton = (props) => {
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

TableButton.propTypes = {
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired // (event) => void
}