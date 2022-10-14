import styles from './index.module.css';
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '../../assets/icons/search.svg';
import { createPortal } from 'react-dom';
const cx = classNames.bind(styles);

export const ColumnSearch = (props) => {
    const {
        searchValue,
        onChange,
        onSearch,
    } = props;

    const [showSelect, setShowSelect] = useState(false);
    const [pos, setPos] = useState({left: 0, top: 0});
    const [value, setValue] = useState(searchValue);
    const inputRef = useRef();
    const containerRef = useRef();

    useEffect(() => {
       if(typeof onChange === 'function') onChange(value);
    }, [value]);

    useEffect(() => {
        if(showSelect) {
            const { left, top } = containerRef.current.getBoundingClientRect();
            setPos({ left: left - 115, top: top + 25 });
        }
    }, [showSelect]);

    const onInputSearch = () => {
        setShowSelect(false);
        onSearch(inputRef.current.value);
        setValue(inputRef.current.value);
    }

    return <div className={cx(styles.headerOperatorWrapper)} ref={containerRef}>
       <img src={SearchIcon} className={cx(styles.headerOperationIcon)} onClick={() => setShowSelect(!showSelect)}/>
       {showSelect && createPortal(<div 
            className={cx(styles.container)}
            style={{
                left: pos.left + 'px',
                top: pos.top + 'px',
            }}
        >
            <div className={cx(styles.searchBox)}>
                <input
                    className={cx(styles.input)}
                    defaultValue={value}
                    ref={inputRef}
                />
                <img src={SearchIcon} className={cx(styles.searchIcon)} onClick={onInputSearch}/>
            </div>
        </div>, document.getElementById('root'))}
    </div>
}