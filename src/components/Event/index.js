import styles from './index.module.css';
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { addDays, formatGetTime, getDay, getEndTime, getEventHeight, getEventTop, getEventWidth, getLeftFromDay, getMinDiff, getMonday, nonDraggingPropsChange, topToTime, yyyymmddToDateObj } from '../../lib/util';
import { EventDetails } from '../EventDetails';
import { toast } from 'react-toastify';
import { EVENT_TYPE, RESPONSE_STATUS, USER_TYPE } from '../../lib/constants';
import { useAuth, useAuthenticatedRequest } from '../../lib/hooks';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Each event on the calendar page
export const Event = (props) => {
    const {
        hoverCol,
        scrollTop,
        calendarHeight,
        dragging,
        setDragging,
        columnWidth,
        idx,
        events,
        getEvents,
        vision,
    } = props;
    console.log('render');
    const { post } = useAuthenticatedRequest();
    const { startTime, endTime, title, date, description, location, eventId, mandatory, eventType, is_common } = events[idx];
    const { auth } = useAuth();
    const [left, setLeft] = useState(40);
    const [top, setTop] = useState(getEventTop(startTime));
    const [showEdit, setShowEdit] = useState(false);
    const initDrag = useRef({ x: 0, y: 0, left: 0, top: 0 });
    const dragRef = useRef();
    const eventElement = useRef();
    const day = getDay(yyyymmddToDateObj(date));
    const timeDiff = getMinDiff(startTime, endTime);
    const [posChange, setPosChange] = useState(0);
    const { width: eventWidth, left: eventExtraLeft } = getEventWidth(events, idx, columnWidth);

    useEffect(() => {
        setLeft(getLeftFromDay({ day, columnWidth }));
    }, [day, columnWidth]);

    useEffect(() => {
        setTop(getEventTop(startTime));
    }, [startTime])

    useEffect(() => {
        if(dragging[eventId]) setLeft(40 + (hoverCol - 1) * columnWidth);
    }, [dragging[eventId], hoverCol]);

    useEffect(() => {
        if(posChange !== 0) {
            if(eventType === EVENT_TYPE.VUCEPTOR) {
                post({
                    url: '/updateVUEvent',
                    params: {
                        title: title,
                        mandatory: mandatory,
                        date: formatGetTime(addDays(getMonday(yyyymmddToDateObj(date)), Math.floor(left / columnWidth)).getTime()),
                        start_time: topToTime(top),
                        description: description,
                        location: location,
                        end_time: getEndTime(startTime, endTime, topToTime(top)),
                        event_id: eventId.split('|')[1]
                    },
                    onResolve: res => {
                        const { status } = res;
                        if(status === RESPONSE_STATUS.SUCCESS) getEvents();
                        else toast('Error updating event');
                    },
                    onReject: () => toast('Error updating event')
                });
            }
            else {
                post({
                    url: '/updatefyEvent',
                    params: {
                        title: title,
                        is_common: is_common,
                        date: formatGetTime(addDays(getMonday(yyyymmddToDateObj(date)), Math.floor(left / columnWidth)).getTime()),
                        start_time: topToTime(top),
                        description: description,
                        location: location,
                        end_time: getEndTime(startTime, endTime, topToTime(top)),
                        event_id: eventId.split('|')[1],
                        visions: vision
                    },
                    onResolve: res => {
                        const { status } = res;
                        if(status === RESPONSE_STATUS.SUCCESS) getEvents();
                        else toast('Error updating event');
                    },
                    onReject: () => toast('Error updating event')
                });
            }
        }
    }, [posChange]);

    const onDrag = (e) => {
        setDragging({
            ...dragging,
            [eventId]: true
        });
        if(!dragRef.current) dragRef.current = true;
        let yDiff = e.clientY - initDrag.current.y;
        if(yDiff) {
            let newTop = initDrag.current.top + yDiff;
            if(newTop + eventElement?.current?.offsetHeight > 25 * 60) newTop = 25 * 60 - eventElement?.current?.offsetHeight;
            if(newTop + eventElement?.current?.offsetHeight > scrollTop + calendarHeight) newTop = scrollTop + calendarHeight - eventElement?.current?.offsetHeight;
            if(newTop < scrollTop + 60) newTop = scrollTop + 60;
            if((newTop - 60) % 15 < 10) {
                const tmp = Math.floor((newTop - 60) / 15);
                setTop(60 + tmp * 15);
            }
        }
    }

    const onDragEnd = (e) => {
        if(!dragRef.current) setShowEdit(true);
        else {
            if(auth?.type && auth?.type !== USER_TYPE.VUCEPTOR) setPosChange(posChange + 1);
        }
        setDragging({
            ...dragging,
            [eventId]: false
        });
        dragRef.current = false;
        initDrag.current = { x: 0, y: 0, left: 0, top: 0 };
        document.getElementById('calendar').style.overflow = '';
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', onDragEnd);
    }

    const onDragStart = (e) => {
        document.getElementById('calendar').style.overflow = 'hidden';
        initDrag.current = { x: e.clientX, y: e.clientY, left, top };
        if(auth?.type && auth?.type !== USER_TYPE.VUCEPTOR) window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', onDragEnd);
    }

    return <>
        <div 
            className={cx(styles.container, {
                [styles.dragging]: dragging[eventId],
                [styles.vuceptor]: eventType === EVENT_TYPE.VUCEPTOR,
                [styles.firstYear]: eventType === EVENT_TYPE.FIRST_YEAR,
            })} 
            style={{ 
                width: `${dragging[eventId] ? columnWidth : eventWidth}px`,
                height: `${getEventHeight(timeDiff)}px`,
                left: `${dragging[eventId] ? left : left + eventExtraLeft}px`,
                top: `${top}px`
            }}
            onMouseDown={onDragStart}
            ref={eventElement}
        >
            {(eventWidth >= 130 && getEventHeight(timeDiff) >= 100) && <div className={cx(styles.times)}>
                <div 
                    className={cx(styles.time, {
                        [styles.vuceptor]: eventType === EVENT_TYPE.VUCEPTOR,
                        [styles.firstYear]: eventType === EVENT_TYPE.FIRST_YEAR,
                    })}
                >
                    {startTime}
                </div>
                <div 
                    className={cx(styles.time, {
                        [styles.vuceptor]: eventType === EVENT_TYPE.VUCEPTOR,
                        [styles.firstYear]: eventType === EVENT_TYPE.FIRST_YEAR,
                    })}
                >
                    {endTime}
                </div>
            </div>}
            <textarea className={cx(styles.description)} value={title} readOnly/>
        </div>
        {showEdit && <EventDetails 
            eventX={eventElement.current.getBoundingClientRect().left}
            eventY={eventElement.current.getBoundingClientRect().top}
            eventWidth={eventElement.current.offsetWidth}
            eventHeight={eventElement.current.offsetHeight}
            setShowPopUp={setShowEdit}
            title={title}
            date={date}
            startTime={startTime}
            endTime={endTime}
            location={location}
            description={description}
            eventId={eventId}
            getEvents={getEvents}
            mandatory={mandatory}
            is_common={is_common}
            eventType={eventType}
            vision={vision}
        />}
    </>
};

Event.propTypes = {
    hoverCol: PropTypes.number, // the current row being hovered
    scrollTop: PropTypes.number, // scrollTop of current window
    calendarHeight: PropTypes.number, // height of the calendar component
    dragging: PropTypes.object, // a map containing status of whether each event is being dragged
    setDragging: PropTypes.func,
    columnWidth: PropTypes.number, // width of each column of the calendar
    idx: PropTypes.number, // index of this event in events array
    events: PropTypes.array, // all events on the calendar
    getEvents: PropTypes.func, // function that get events
    vision: PropTypes.string, // vision number selected on the calendar
}