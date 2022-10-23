import styles from './index.module.css';
import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import SearchIcon from '../../assets/icons/search.svg';
import { createPortal } from 'react-dom';
import { useOnClickOutside } from '../../lib/hooks';
import { debounce } from '../../lib/util';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Search condition for table column
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

    useOnClickOutside([containerRef, inputRef], useCallback(() => {
        setShowSelect(false);
    }, []));

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
        onSearch(inputRef.current.value);
        setValue(inputRef.current.value);
    }

    const debouncedPostAbsence = useCallback(debounce(onInputSearch, 1000), []);

    return <>
        <div 
            className={cx(styles.headerOperatorWrapper)}
            ref={containerRef}
            data-testid='column-search-container'
        >
            <img 
                src={SearchIcon}
                className={cx(styles.headerOperationIcon)}
                onClick={() => setShowSelect(!showSelect)}
                data-testid='column-search-icon'
            />
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
                        onChange={debouncedPostAbsence}
                        data-testid='column-search-input'
                    />
                </div>
            </div>, document.getElementById('root'))}
        </div>
    </>
};

ColumnSearch.propTypes = {
    searchValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired, // (val: String) => void
    onSearch: PropTypes.func.isRequired // (val: String) => void
}