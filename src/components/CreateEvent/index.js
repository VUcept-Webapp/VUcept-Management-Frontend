import styles from './index.module.css';
import classNames from 'classnames/bind';
import PropTypes, { array } from 'prop-types';
import { useWindowSize, useAuth } from '../../lib/hooks';
import { addHalfAnHour, earlierThan, formatGetTime, yyyymmddToDateObj } from '../../lib/util';
import { EVENT, RESPONSE_STATUS, WINDOW_TYPE } from '../../lib/constants';
import { useEffect, useRef, useState } from 'react';
import LocationIcon from '../../assets/icons/location.svg';
import ClockIcon from '../../assets/icons/clock.svg';
import PenIcon from '../../assets/icons/pen.svg';
import { CalendarComponent } from '../CalendarComponent';
import { TimePicker } from '../TimePicker';
import { toast } from 'react-toastify';
import { createVUEvent } from '../../lib/services';
const cx = classNames.bind(styles);

// Pop up for adding first-year student
export const CreateEvent = (props) => {
    const {
        setShowPopUp,
        date,
        startTime,
        getVUEvents,
    } = props;
    const { auth } = useAuth();
    const { type } = useWindowSize();
    const [eventDate, setEventDate] = useState(yyyymmddToDateObj(date).getTime());
    const popUp = useRef();
    const calendarHolder = useRef();
    const startTimeRef = useRef();
    const endTimeRef = useRef();
    const titleRef = useRef();
    const locationRef = useRef();
    const descriptionRef = useRef();

    const onSubmit = () => {
        const inputTitle = titleRef.current.value;
        const descriptionInput = descriptionRef.current.value;
        const locationInput = locationRef.current.value;
        const startTimeInput = startTimeRef.current;
        const endTimeInput = endTimeRef.current;
        const dateInput = formatGetTime(new Date(eventDate).getTime());
        if(!inputTitle) toast('Please provide a title');
        else if(earlierThan(endTimeInput, startTimeInput)) toast('Please provide a valid time range');
        else {
            createVUEvent({
                title: inputTitle,
                logged_by: auth?.email,
                date: dateInput,
                start_time: startTimeInput,
                description: descriptionInput,
                location: locationInput,
                end_time: endTimeInput,
            })
                .then(res => {
                    const { status } = res;
                    if(status === RESPONSE_STATUS.SUCCESS) {
                        setShowPopUp(false);
                        getVUEvents();
                    }
                    else toast('Error updating event');
                })
                .catch(err => toast('Error updating event'));
        }
    }

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
                    ref={titleRef}
                />
            </div>
            <div className={cx(styles.row)}>
                <img src={LocationIcon} className={cx(styles.icon)}/>
                <input 
                    className={cx(styles.rowText)} 
                    placeholder={EVENT.ENTER_LOCATION}
                    ref={locationRef}
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
                        ref={startTimeRef}
                    />
                    <span>:</span>
                    <TimePicker
                        time={addHalfAnHour(startTime)}
                        ref={endTimeRef}
                    />
                </div>
            </div>
            <div className={cx(styles.row)}>
                <img src={PenIcon} className={cx(styles.icon)}/>
                <input 
                    className={cx(styles.rowText)} 
                    placeholder={EVENT.ENTER_DESCRIPTION}
                    ref={descriptionRef}
                />
            </div>
            <div className={cx(styles.buttonWrapper)}>
                <div className={cx(styles.submit)} onClick={onSubmit}>
                    {EVENT.SUBMIT}
                </div>
            </div>
        </div>
    </>
}