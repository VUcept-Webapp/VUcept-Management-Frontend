import { useWindowSize } from '../../lib/hooks';
import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
import { WINDOW_TYPE } from '../../lib/constants';
const cx = classNames.bind(styles);

export const Caption = (props) => {
    const {
        text,
        className,
        style,
    } = props;

    const { width, type } =  useWindowSize();
    const isMobile = type === WINDOW_TYPE.MOBILE;
    const isSmall = width < 600 || isMobile;
    
    return <div
        className={cx(styles.caption, className, {
            [styles.mobile]: isMobile
        })}
        style={style}
    >
        {text}
    </div>
}