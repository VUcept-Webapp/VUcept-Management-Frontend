import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
const cx = classNames.bind(styles);

export const TableItem = (props) => {
    const {
        className,
        style,
        item
    } = props;

    console.log(item);

    const renderItem = () => {
        if(item === 'Advisor') return <span className={cx(styles.advisor, className)} style={style}>{item}</span>
        else if(item === 'Board') return <span className={cx(styles.board, className)} style={style}>{item}</span>
        else if(item === 'VUceptor') return <span className={cx(styles.vuceptor, className)} style={style}>{item}</span>
        else if(item === 'Registered') return <span className={cx(styles.registered, className)} style={style}>{item}</span>
        else if(item === 'Unregistered') return <span className={cx(styles.unregistered, className)} style={style}>{item}</span>

        else return <span className={cx(className)} style={style}>{item}</span>
    }
    
    return renderItem();
}