import { useWindowSize } from '../../lib/hooks';
import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
import { WINDOW_TYPE } from '../../lib/constants';
import SearchIcon from '../../assets/icons/search.svg';
const cx = classNames.bind(styles);

export const TableSearch = (props) => {
    const {
        text,
        className,
        style,
    } = props;

    const { width, type } =  useWindowSize();
    const isMobile = type === WINDOW_TYPE.MOBILE;
    const isSmall = width < 700 && !isMobile;
    
    return <div className={cx(styles.container, {
        [styles.small]: isSmall,
    })}>
        <span className={cx(styles.label)}>Search</span>
        <div className={cx(styles.searchBox, {
            [styles.small]: isSmall,
        })}>
            <input className={cx(styles.input)}/>
            <img src={SearchIcon} className={cx(styles.searchIcon)}/>
        </div>
    </div>
}