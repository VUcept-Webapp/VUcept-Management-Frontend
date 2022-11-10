import styles from './index.module.css';
import classNames from 'classnames/bind';
import PropTypes, { array } from 'prop-types';
import { useWindowSize } from '../../lib/hooks';
import { addHalfAnHour, formatGetTime, yyyymmddToDateObj } from '../../lib/util';
import { EVENT, WINDOW_TYPE } from '../../lib/constants';
import { useEffect, useRef, useState } from 'react';
import LocationIcon from '../../assets/icons/location.svg';
import ClockIcon from '../../assets/icons/clock.svg';
import PenIcon from '../../assets/icons/pen.svg';
import { CalendarComponent } from '../CalendarComponent';
import { TimePicker } from '../TimePicker';
const cx = classNames.bind(styles);

// Pop up for adding first-year student
export const CreateEvent = (props) => {
    const {
        setShowPopUp,
        date,
        startTime,
    } = props;
    const { type } = useWindowSize();
    const [eventDate, setEventDate] = useState(yyyymmddToDateObj(date).getTime());
    const popUp = useRef();
    const calendarHolder = useRef();
    const hourPicker = useRef();
    const minutePicker = useRef();

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

    return <>
        <div className={cx(styles.blocker)}></div>
        <div 
            className={cx(styles.eventPopUp, {[styles.mobile]: type === WINDOW_TYPE.MOBILE})}
            ref={popUp}
        >
            <div className={cx(styles.row)}>
                <input 
                    className={cx(styles.rowText)} 
                    defaultValue={EVENT.MY_EVENT}
                />
            </div>
            <div className={cx(styles.row)}>
                <img src={LocationIcon} className={cx(styles.icon)}/>
                <input 
                    className={cx(styles.rowText)} 
                    placeholder={EVENT.ENTER_LOCATION}
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
                        time={startTime}
                        ref={hourPicker}
                    />
                    <span>:</span>
                    <TimePicker
                        time={addHalfAnHour(startTime)}
                        ref={minutePicker}
                    />
                </div>
            </div>
            <div className={cx(styles.row)}>
                <img src={PenIcon} className={cx(styles.icon)}/>
                <input 
                    className={cx(styles.rowText)} 
                    placeholder={EVENT.ENTER_DESCRIPTION}
                />
            </div>
            <div className={cx(styles.buttonWrapper)}>
                <div className={cx(styles.submit)}>
                    {EVENT.SUBMIT}
                </div>
            </div>
        </div>
    </>
}