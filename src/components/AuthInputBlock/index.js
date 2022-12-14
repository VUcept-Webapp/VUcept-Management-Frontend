import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Input field for authentication
export const AuthInputBlock = React.forwardRef((props, ref) => {
    const {
        label,
        containerClassName,
        containerStyle,
        value,
        onChange,
        hide = false,
    } = props;
    
    return <div
        className={cx(styles.inputBlock, containerClassName)}
        style={containerStyle}
        data-testid='auth-input-container'
    >
        <p
            className={cx(styles.label)}
            data-testid='auth-input-label'
        >
            {label || ""}
        </p>
        <input 
            className={cx(styles.input)}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            data-testid='auth-input-input'
            type={hide && 'password'}
        />
    </div>
});

AuthInputBlock.propTypes = {
    label: PropTypes.string.isRequired,
    containerClassName: PropTypes.string,
    containerStyle: PropTypes.objectOf(PropTypes.string),
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired, // (value: String) => void
    hide: PropTypes.bool
}