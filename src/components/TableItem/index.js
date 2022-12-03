import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Each block of table
export const TableItem = (props) => {
    const {
        className,
        style,
        item
    } = props;
    
    const renderItem = () => {
        if(item === 'Adviser') return <span data-testid='table-item' className={cx(styles.advisor, className)} style={style}>Adviser</span>
        else if(item === 'Board') return <span data-testid='table-item' className={cx(styles.board, className)} style={style}>Board</span>
        else if(item === 'VUceptor') return <span data-testid='table-item' className={cx(styles.vuceptor, className)} style={style}>VUceptor</span>
        else if(item === 'Registered') return <span data-testid='table-item' className={cx(styles.registered, className)} style={style}>Registered</span>
        else if(item === 'Unregistered') return <span data-testid='table-item' className={cx(styles.unregistered, className)} style={style}>Unregistered</span>
        else if(item === 'Present') return <span data-testid='table-item' className={cx(styles.attended, className)} style={style}>Present</span>
        else if(item === 'Absent') return <span data-testid='table-item' className={cx(styles.absent, className)} style={style}>Absent</span>
        else if(item === 'Excused') return <span data-testid='table-item' className={cx(styles.excused, className)} style={style}>Excused</span>
        else if(item === 'Unlogged') return <span data-testid='table-item' className={cx(styles.unlogged, className)} style={style}>Unlogged</span>
        else return <span data-testid='table-item' className={cx(className)} style={style}>{item}</span>
    }
    
    return renderItem();
}

TableItem.propTypes = {
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
    item: PropTypes.string.isRequired,
}