import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
const cx = classNames.bind(styles);

export const Block = React.forwardRef((props, ref) => {
    const {
        className,
        style,
        id,
        children
    } = props;
    
    return <div
        className={cx(styles.block, className)}
        style={style}
        ref={ref}
    >
        {children}
    </div>
})