import styles from './index.module.css';
import classNames from 'classnames/bind';
import Calendar from 'react-calendar';
import CalendarIcon from '../../assets/icons/calendarComponent.svg';
import './calendar.css';
import { useState, useRef, useEffect } from 'react';
import { useWindowSize } from '../../lib/hooks';
import { createPortal } from 'react-dom';
const cx = classNames.bind(styles);


export const CalendarComponent = (props) => {
    const {

    } = props;

    const { width } = useWindowSize();
    const [display, setDisplay] = useState(false);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0)
    const imageEle = useRef();

    useEffect(() => {
        const close = () => setDisplay(false);
        if(display) window.addEventListener('click', close);
        else window.removeEventListener('click', close);
    }, [display]);

    const onClickIcon = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setDisplay(!display);
        console.log(imageEle.current.getBoundingClientRect().left, imageEle.current.getBoundingClientRect().right, width );
        setTop(imageEle.current.getBoundingClientRect().top + 23);
        if(imageEle.current.getBoundingClientRect().right + 20 > 300) setLeft(imageEle.current.getBoundingClientRect().right - 300);
        else if(imageEle.current.getBoundingClientRect().left + 300 < width) setLeft(imageEle.current.getBoundingClientRect().left);
        else setLeft(Math.ceil(width / 2) - 150);
    }

    return <>
        <div className={cx(styles.calendarWrapper)}>
            <img
                src={CalendarIcon}
                className={cx(styles.calendarIcon)}
                onClick={onClickIcon}
                ref={imageEle}
            />
            {display && createPortal(<div
                className={cx(styles.calendarHolder)}
                style={{ left: `${left}px`, top: `${top}px` }}
            >
                <Calendar
                    className={cx(styles.calendar)}
                />
            </div>, document.getElementById('root'))}
        </div>
    </>
}