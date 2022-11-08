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
        if(item === 'Advisor') return <span className={cx(styles.advisor, className)} style={style}>Advisor</span>
        else if(item === 'Board') return <span className={cx(styles.board, className)} style={style}>Board</span>
        else if(item === 'VUceptor') return <span className={cx(styles.vuceptor, className)} style={style}>VUceptor</span>
        else if(item === 'Registered') return <span className={cx(styles.registered, className)} style={style}>Registered</span>
        else if(item === 'Unregistered') return <span className={cx(styles.unregistered, className)} style={style}>Unregistered</span>
        else if(item === 'Attended') return <span className={cx(styles.attended, className)} style={style}>Attended</span>
        else if(item === 'Absent') return <span className={cx(styles.absent, className)} style={style}>Absent</span>
        else if(item === 'Unlogged') return <span className={cx(styles.excused, className)} style={style}>Unlogged</span>
        else return <span className={cx(className)} style={style}>{item}</span>
    }
    
    return renderItem();
}

TableItem.propTypes = {
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
    item: PropTypes.string.isRequired,
}