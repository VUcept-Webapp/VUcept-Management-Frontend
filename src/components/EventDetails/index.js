import styles from './index.module.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useWindowSize } from '../../lib/hooks';
import { formatGetTime, getEventPopUpLeft, getEventPopUpTop, yyyymmddToDateObj } from '../../lib/util';
import { EVENT, WINDOW_TYPE } from '../../lib/constants';
import { useEffect, useRef, useState } from 'react';
import LocationIcon from '../../assets/icons/location.svg';
import ClockIcon from '../../assets/icons/clock.svg';
import PenIcon from '../../assets/icons/pen.svg';
import { CalendarComponent } from '../CalendarComponent';
import { TimePicker } from '../TimePicker';
const cx = classNames.bind(styles);

// Pop up for adding first-year student
export const EventDetails = (props) => {
    const {
        eventX,
        eventY,
        eventWidth,
        eventHeight,
        setShowPopUp,
        title,
        date,
        startTime,
        endTime,
        location,
        description,
        attendance,
    } = props;
    const { width, height, type } = useWindowSize();
    const [eventDate, setEventDate] = useState(yyyymmddToDateObj(date).getTime());
    const popUp = useRef();
    const calendarHolder = useRef();
    const hourPicker = useRef();
    const minutePicker = useRef();
    const popUpLeft = getEventPopUpLeft({ eventX, screenWidth: width, eventWidth });
    const popUpTop = getEventPopUpTop({ eventY, screenHeight: height, eventHeight });

    useEffect(() => {
        const listener = (event) => {
            let outside = true;
            if (popUp?.current?.contains(event.target) || calendarHolder?.current?.contains(event.target)) {
                outside = false;
                return;
            }
            if(outside) setShowPopUp(false);
        };
        document.addEventListener("mousedown", listener);
        return () => document.removeEventListener("mousedown", listener);
    }, []);

    return <div 
        className={cx(styles.eventPopUp, {[styles.mobile]: type === WINDOW_TYPE.MOBILE})}
        style={{
            width: popUpLeft && `${EVENT.POPUP_WIDTH}px`,
            top: popUpTop && `${popUpTop}px`,
            left: popUpLeft && `${popUpLeft}px`,
            transform: popUpLeft ? 'translateY(-50%)' : 'translate(-50%, -50%)',
        }}
        ref={popUp}
    >
        <div className={cx(styles.row)}>
            <input 
                className={cx(styles.rowText)} 
                defaultValue={title}
            />
        </div>
        <div className={cx(styles.row)}>
            <img src={LocationIcon} className={cx(styles.icon)}/>
            <input 
                className={cx(styles.rowText)} 
                defaultValue={location}
            />
        </div>
        <div className={cx(styles.twoColumnRow)}>
            <div className={cx(styles.rowBlock, styles.separate)}>
                <div className={cx(styles.icon)}>
                    <CalendarComponent
                        start={eventDate}
                        onDateChange={(val) => setEventDate(val)}
                        ref={calendarHolder}
                    />
                </div>
                <span 
                    className={cx(styles.rowText)} 
                >
                    {formatGetTime(eventDate)}
                </span>
            </div>
            <div className={cx(styles.rowBlock)}>
                <img src={ClockIcon} className={cx(styles.icon)}/>
                <TimePicker
                    time={'12:17'}
                    ref={hourPicker}
                />
                <span>:</span>
                <TimePicker
                    time={'18:22'}
                    ref={minutePicker}
                />
            </div>
        </div>
        <div className={cx(styles.row)}>
            <img src={PenIcon} className={cx(styles.icon)}/>
            <input 
                className={cx(styles.rowText)} 
                defaultValue={description}
            />
        </div>
        <div className={cx(styles.row)}>
            <span>{EVENT.ATTENDANCE_LABEL}</span>
            <input 
                className={cx(styles.checkbox)} 
                type='checkbox'
                checked={attendance ? 'yes' : 'false'}
            />
        </div>
        <div className={cx(styles.row)}>
            <span>{EVENT.ATTENDANCE_FEEDBACK}</span>
            <input 
                className={cx(styles.feedback)} 
            />
        </div>
        <div className={cx(styles.buttonWrapper)}>
            <div className={cx(styles.submit)}>
                {EVENT.SUBMIT}
            </div>
        </div>
    </div>
}