import styles from './index.module.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useAuthenticatedRequest, useWindowSize } from '../../lib/hooks';
import { addHalfAnHour, earlierThan, formatGetTime, yyyymmddToDateObj } from '../../lib/util';
import { CREATE_EVENT_OPTIONS, EVENT, RESPONSE_STATUS, WINDOW_TYPE } from '../../lib/constants';
import { useEffect, useRef, useState } from 'react';
import LocationIcon from '../../assets/icons/location.svg';
import ClockIcon from '../../assets/icons/clock.svg';
import PenIcon from '../../assets/icons/pen.svg';
import { CalendarComponent } from '../CalendarComponent';
import { TimePicker } from '../TimePicker';
import { toast } from 'react-toastify';
import { TableSelect } from '../TableSelect';
const cx = classNames.bind(styles);

// Pop up for adding first-year student
export const CreateEvent = (props) => {
    const {
        setShowPopUp,
        date,
        startTime,
        getEvents,
        vision
    } = props;
    const { post } = useAuthenticatedRequest();
    const { type } = useWindowSize();
    const [eventDate, setEventDate] = useState(yyyymmddToDateObj(date).getTime());
    const [eventType, setEventType] = useState('VUceptor');
    const [isVisions, setIsVisions] = useState(false);
    const [isMandatory, setIsMandatory] = useState(false);
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
            const inputs = {
                title: inputTitle,
                date: dateInput,
                start_time: startTimeInput,
                description: descriptionInput,
                location: locationInput,
                end_time: endTimeInput,
            }
            if(eventType === 'VUceptor') {
                post({
                    url: '/createVUEvent',
                    params: { ...inputs, mandatory: isMandatory ? 1 : 0 },
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
                    url: '/createfyEvent',
                    params: { ...inputs, is_common: isVisions ? 0 : 1, visions: vision || 0 },
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
            <div className={cx(styles.row)} data-testid='create-event-type'>
                <span className={cx(styles.label)} >{EVENT.EVENT_TYPE}</span>
                <TableSelect
                    className={cx(styles.eventTypeSelector)}
                    options={vision ? CREATE_EVENT_OPTIONS : { label: 'VUceptor', value: 'VUceptor' }}
                    selected={{ label: eventType, value: eventType }}
                    onChange={({ value }) => setEventType(value)}
                />
            </div>
            <div className={cx(styles.row)} data-testid='create-event-title'>
                <input 
                    className={cx(styles.rowText)} 
                    defaultValue={EVENT.MY_EVENT}
                    ref={titleRef}
                />
            </div>
            <div className={cx(styles.row)} data-testid='create-event-location'>
                <img src={LocationIcon} className={cx(styles.icon)}/>
                <input 
                    className={cx(styles.rowText)} 
                    placeholder={EVENT.ENTER_LOCATION}
                    ref={locationRef}
                />
            </div>
            <div className={cx(styles.twoColumnRow)}>
                <div className={cx(styles.rowBlock, styles.separate)} data-testid='create-event-date'>
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
                <div className={cx(styles.rowBlock)} data-testid='create-event-time'>
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
            <div className={cx(styles.row)} data-testid='create-event-description'>
                <img src={PenIcon} className={cx(styles.icon)}/>
                <input 
                    className={cx(styles.rowText)} 
                    placeholder={EVENT.ENTER_DESCRIPTION}
                    ref={descriptionRef}
                />
            </div>
            {eventType === 'First-year Student' && <div className={cx(styles.row)}>
                <span className={cx(styles.label)} >{EVENT.IS_VISIONS}</span>
                <input 
                    className={cx(styles.checkbox)} 
                    type='checkbox'
                    checked={isVisions}
                    onChange={(e) => setIsVisions(e.target.checked)}
                />
            </div>}
            {eventType === 'VUceptor' && <div className={cx(styles.row)}>
                <span className={cx(styles.label)} >{EVENT.IS_MANDATORY}</span>
                <input 
                    className={cx(styles.checkbox)} 
                    type='checkbox'
                    checked={isMandatory}
                    onChange={(e) => setIsMandatory(e.target.checked)}
                />
            </div>}
            <div className={cx(styles.buttonWrapper)}>
                <div className={cx(styles.submit)} onClick={onSubmit}>
                    {EVENT.SUBMIT}
                </div>
            </div>
        </div>
    </>
}

CreateEvent.propTypes = {
    setShowPopUp: PropTypes.func,
    date: PropTypes.string, // yyyy-mm-dd
    startTime: PropTypes.string, // hh:mm
    getEvents: PropTypes.func,
    vision: PropTypes.string
}