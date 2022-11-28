import styles from './index.module.css';
import classNames from 'classnames/bind';
import Calendar from 'react-calendar';
import CalendarIcon from '../../assets/icons/calendarComponent.svg';
import './calendar.css';
import { useState, useRef, useEffect } from 'react';
import { useWindowSize } from '../../lib/hooks';
import { createPortal } from 'react-dom';
import { ScreenBlocker } from '../ScreenBlocker';
import PropTypes from 'prop-types';
import React from 'react';
const cx = classNames.bind(styles);

// Date selected with a calendar view
export const CalendarComponent = React.forwardRef((props, ref) => {
    const {
        start = new Date().getTime(),
        readOnly = false,
        onDateChange,
    } = props;

    const { width } = useWindowSize();
    const [display, setDisplay] = useState(false);
    const [showBlocker, setShowBlocker] = useState(false);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0)
    const [date, setDate] = useState(start);
    const imageEle = useRef();

    useEffect(() => {
        if(display) setShowBlocker(true);
    }, [display]);

    const onClickIcon = () => {
        if(readOnly) return;
        setDisplay(!display);
        setTop(imageEle.current.getBoundingClientRect().top + 23);
        // dynamically set calendar location
        if(imageEle.current.getBoundingClientRect().right + 20 > 300) setLeft(imageEle.current.getBoundingClientRect().right - 300);
        else if(imageEle.current.getBoundingClientRect().left + 300 < width) setLeft(imageEle.current.getBoundingClientRect().left);
        else setLeft(Math.ceil(width / 2) - 150);
    }

    return <>
        <ScreenBlocker 
            show={showBlocker}
            onClick={() => {
                setDisplay(false);
                setShowBlocker(false);
            }}
        />
        <div 
            className={cx(styles.calendarWrapper)} 
            onClick={(event) => {
                event.stopPropagation();
                event.nativeEvent.stopImmediatePropagation();
            }}
            data-testid='calendar-component-container'
        >
            <img
                src={CalendarIcon}
                className={cx(styles.calendarIcon)}
                onClick={onClickIcon}
                ref={imageEle}
                data-testid='calendar-component-img'
            />
            {display && createPortal(<div
                className={cx(styles.calendarHolder)}
                style={{ left: `${left}px`, top: `${top}px` }}
                data-testid='calendar-component-wrapper'
                ref={ref}
            >
                <Calendar
                    className={cx(styles.calendar)}
                    onClickDay={(val, event) => {
                        event.stopPropagation();
                        event.nativeEvent.stopImmediatePropagation();
                        if(typeof onDateChange === 'function') onDateChange(val);
                        setDate(val);
                        setDisplay(false);
                        setShowBlocker(false);
                    }}
                    value={new Date(date)}
                />
            </div>, document.getElementById('root'))}
        </div>
    </>
});

CalendarComponent.propTypes = {
    onDateChange: PropTypes.func.isRequired, // (date: string) => void
    start: PropTypes.object, // start date
    readOnly: PropTypes.bool
}