import { useWindowSize } from '../../lib/hooks';
import styles from './index.module.css';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { WINDOW_TYPE } from '../../lib/constants';
import SearchIcon from '../../assets/icons/search.svg';
const cx = classNames.bind(styles);

export const ColumnSearch = (props) => {
    const {
        className,
        style,
        onChange,
        onSearch,
    } = props;

    const [showSelect, setShowSelect] = useState(false);
    const [value, setValue] = useState("");

    useEffect(() => {
       if(typeof onChange === 'function') onChange(value);
    }, [value]);

    const onInputSearch = () => {
        setShowSelect(false);
        onSearch(value);
    }

    return <div className={cx(styles.headerOperatorWrapper)}>
       <img src={SearchIcon} className={cx(styles.headerOperationIcon)} onClick={() => setShowSelect(!showSelect)}/>
       {showSelect && <div className={cx(styles.container)}>
            <div className={cx(styles.searchBox)}>
                <input
                    className={cx(styles.input)}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <img src={SearchIcon} className={cx(styles.searchIcon)} onClick={onInputSearch}/>
            </div>
        </div>}
    </div>
}