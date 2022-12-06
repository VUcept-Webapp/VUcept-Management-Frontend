import styles from './index.module.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useAuth, useAuthenticatedRequest, useWindowSize } from '../../lib/hooks';
import { earlierThan, formatGetTime, getEventPopUpLeft, getEventPopUpTop, yyyymmddToDateObj } from '../../lib/util';
import { EVENT, EVENT_TYPE, RESPONSE_STATUS, USER_TYPE, USER_TYPE_OPTIONS, WINDOW_TYPE } from '../../lib/constants';
import { useEffect, useRef, useState } from 'react';
import LocationIcon from '../../assets/icons/location.svg';
import ClockIcon from '../../assets/icons/clock.svg';
import PenIcon from '../../assets/icons/pen.svg';
import { CalendarComponent } from '../CalendarComponent';
import { TimePicker } from '../TimePicker';
import { toast } from 'react-toastify';
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
        eventId,
        getEvents,
        mandatory,
        is_common,
        eventType,
        vision
    } = props;
    const { auth } = useAuth();
    const { post } = useAuthenticatedRequest();
    const { width, height, type } = useWindowSize();
    const [eventDate, setEventDate] = useState(yyyymmddToDateObj(date).getTime());
    const [isMandatory, setIsMandatory] = useState(parseInt(mandatory) === 1);
    const [attendance, setAttendance] = useState(false);
    const popUp = useRef();
    const calendarHolder = useRef();
    const startTimeRef = useRef();
    const endTimeRef = useRef();
    const titleRef = useRef();
    const locationRef = useRef();
    const descriptionRef = useRef();
    const feedbackRef = useRef();
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

    const onSubmit = () => {
        if(auth?.type === USER_TYPE.VUCEPTOR) {
            post({
                url: '/insertVUAttendance',
                params: { email: auth?.email, eventId: eventId.split('|')[1], attendance: attendance ? 'present' : 'absent' },
                onResolve: res => {
                    const { status } = res;
                    if(status === RESPONSE_STATUS.SUCCESS) setShowPopUp(false);
                    else if(status === RESPONSE_STATUS.REPEATED_RECORDS) {
                        toast('Attendance has already been recorded before.');
                        setShowPopUp(false);
                    }
                    else toast('Error submitting attendance');
                },
                onReject: () => toast('Error submitting attendance')
            });
        }
        else {
            const inputTitle = titleRef.current.value;
            const descriptionInput = descriptionRef.current.value;
            const locationInput = locationRef.current.value;
            const startTimeInput = startTimeRef.current;
            const endTimeInput = endTimeRef.current;
            const dateInput = formatGetTime(new Date(eventDate).getTime());
            if(!inputTitle) toast('Please provide a title');
            else if(earlierThan(endTimeInput, startTimeInput)) toast('Please provide a valid time range');
            else {
                if(eventType === EVENT_TYPE.VUCEPTOR) {
                    post({
                        url: '/updateVUEvent',
                        params: {
                            title: inputTitle,
                            date: dateInput,
                            start_time: startTimeInput,
                            description: descriptionInput,
                            location: locationInput,
                            end_time: endTimeInput,
                            event_id: eventId.split('|')[1],
                            mandatory: isMandatory,
                        },
                        onResolve: res => {
                            const { status } = res;
                            if(status === RESPONSE_STATUS.SUCCESS) {
                                setShowPopUp(false);
                                getEvents();
                            }
                            else toast('Error updating event');
                        },
                        onReject: () => toast('Error updating event')
                    });
                }
                else {
                    post({
                        url: '/updatefyEvent',
                        params: {
                            title: inputTitle,
                            date: dateInput,
                            start_time: startTimeInput,
                            description: descriptionInput,
                            location: locationInput,
                            end_time: endTimeInput,
                            event_id: eventId.split('|')[1],
                            is_common: is_common,
                            visions: vision
                        },
                        onResolve: res => {
                            const { status } = res;
                            if(status === RESPONSE_STATUS.SUCCESS) {
                                setShowPopUp(false);
                                getEvents();
                            }
                            else toast('Error updating event');
                        },
                        onReject: () => toast('Error updating event')
                    });
                }
            }
        }
    }

    const onDelete = () => {
        if(eventType === EVENT_TYPE.VUCEPTOR) {
            post({
                url: '/deleteVUEvent',
                params: { event_id: eventId.split('|')[1] },
                onResolve: res => {
                    const { status } = res;
                    if(status === RESPONSE_STATUS.SUCCESS) {
                        setShowPopUp(false);
                        getEvents();
                    }
                    else toast('Error deleting event');
                },
                onReject: () => toast('Error deleting event')
            });
        }
        else {
            post({
                url: '/deletefyEvent',
                params: { event_id: eventId.split('|')[1] },
                onResolve: res => {
                    const { status } = res;
                    if(status === RESPONSE_STATUS.SUCCESS) {
                        setShowPopUp(false);
                        getEvents();
                    }
                    else toast('Error deleting event');
                },
                onReject: () => toast('Error deleting event')
            });
        }
    }

    return <>
        <div className={cx(styles.blocker)}></div>
        <div 
            className={cx(styles.eventPopUp, {
                [styles.mobile]: type === WINDOW_TYPE.MOBILE,
                [styles.isFy]: eventType === EVENT_TYPE.FIRST_YEAR
            })}
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
                    ref={titleRef}
                    placeholder={EVENT.ENTER_TITLE}
                    readOnly={auth?.type === USER_TYPE.VUCEPTOR}
                />
            </div>
            <div className={cx(styles.row)}>
                <img src={LocationIcon} className={cx(styles.icon)}/>
                <input 
                    className={cx(styles.rowText)} 
                    defaultValue={location}
                    ref={locationRef}
                    placeholder={EVENT.ENTER_LOCATION}
                    readOnly={auth?.type === USER_TYPE.VUCEPTOR}
                />
            </div>
            <div className={cx(styles.twoColumnRow)}>
                <div className={cx(styles.rowBlock, styles.separate)}>
                    <div className={cx(styles.icon)}>
                        <CalendarComponent
                            start={eventDate}
                            onDateChange={(val) => setEventDate(val)}
                            ref={calendarHolder}
                            readOnly={auth?.type === USER_TYPE.VUCEPTOR}
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
                        readOnly={auth?.type === USER_TYPE.VUCEPTOR}
                    />
                    <span>:</span>
                    <TimePicker
                        time={endTime}
                        ref={endTimeRef}
                        readOnly={auth?.type === USER_TYPE.VUCEPTOR}
                    />
                </div>
            </div>
            <div className={cx(styles.row)}>
                <img src={PenIcon} className={cx(styles.icon)}/>
                <input 
                    className={cx(styles.rowText)} 
                    defaultValue={description}
                    ref={descriptionRef}
                    placeholder={EVENT.ENTER_DESCRIPTION}
                    readOnly={auth?.type === USER_TYPE.VUCEPTOR}
                />
            </div>
            {eventType === EVENT_TYPE.VUCEPTOR && <div className={cx(styles.row)}>
                <span>{EVENT.IS_MANDATORY}</span>
                <input 
                    className={cx(styles.checkbox)} 
                    type='checkbox'
                    onChange={e => setIsMandatory(e.target.checked)}
                    checked={isMandatory}
                    disabled={auth?.type === USER_TYPE.VUCEPTOR}
                />
            </div>}
            {auth?.type === USER_TYPE.VUCEPTOR && <div className={cx(styles.row)}>
                <span>{EVENT.ATTENDANCE_LABEL}</span>
                <input 
                    className={cx(styles.checkbox)} 
                    type='checkbox'
                    checked={attendance}
                    onChange={e => setAttendance(e.target.checked)}
                />
            </div>}
            <div className={cx(styles.buttonWrapper)}>
                {auth?.type !== USER_TYPE.VUCEPTOR && <div className={cx(styles.delete, styles.button)} onClick={onDelete}>
                    {EVENT.DELETE}
                </div>}
                <div className={cx(styles.submit, styles.button)} onClick={onSubmit}>
                    {EVENT.SUBMIT}
                </div>
            </div>
        </div>
    </>
}