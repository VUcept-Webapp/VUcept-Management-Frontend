import styles from './index.module.css';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
const cx = classNames.bind(styles);

export const TableSelect = (props) => {
    const {
        className,
        height = 25,
        options,
        selected,
        onChange,
        warn,
    } = props;

    const filterSelectStyles = {
        container: (provided) => ({
            ...provided,
            width: "100%",
            minHeight: `${height}px`,
            height: `${height}px`,
            fontSize: '13.3px',
            fontFamily: 'Open Sans, sans-serif',
            letterSpacing: '0.6px',
        }),
        control: (provided) => ({
            ...provided,
            borderRadius: '5px',
            border: warn ? '1px solid red' : '1px solid rgba(111, 111, 111, 1)',
            minHeight: `${height}px`,
            height: `${height}px`,
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            height: `${height}px`,
            padding: '0 6px'
        }),
        input: (provided) => ({
            ...provided,
            margin: '0px',
        }),
        placeholder: () => ({
            display: 'none'
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: `${height}px`,
        }),
        menuPortal: (provided, state) => ({ 
            ...provided,
            zIndex: 1000
        })
    }
    
    return <div className={cx(styles.container, className)}>
        <Select
            value={selected}
            onChange={onChange}
            options={options}
            styles={filterSelectStyles}
            menuPortalTarget={document.body}
        />
    </div>
}