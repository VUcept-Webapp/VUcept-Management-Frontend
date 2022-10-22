import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// A div with consistent styles
export const Block = React.forwardRef((props, ref) => {
    const {
        className,
        style,
        children
    } = props;
    
    return <div
        className={cx(styles.block, className)}
        style={style}
        ref={ref}
        data-testid='block-div'
    >
        {children}
    </div>
});

Block.propTypes = {
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
    children: PropTypes.array // child components
}