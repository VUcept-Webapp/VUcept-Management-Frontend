import styles from './index.module.css';
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { addDays, formatGetTime, getDay, getEndTime, getEventHeight, getEventTop, getEventWidth, getLeftFromDay, getMinDiff, getMonday, nonDraggingPropsChange, topToTime, yyyymmddToDateObj } from '../../lib/util';
import { EventDetails } from '../EventDetails';
import { updateVUEvent } from '../../lib/services';
import { toast } from 'react-toastify';
import { RESPONSE_STATUS } from '../../lib/constants';
const cx = classNames.bind(styles);

// Each event on the calendar page
export const Event = React.memo((props) => {
    const {
        hoverCol,
        scrollTop,
        calendarHeight,
        dragging,
        setDragging,
        columnWidth,
        idx,
        events,
        getVUEvents,
    } = props;
    const { startTime, endTime, title, date, description, location, eventId, loggedBy } = events[idx];
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
            updateVUEvent({
                title: title,
                logged_by: loggedBy,
                date: formatGetTime(addDays(getMonday(yyyymmddToDateObj(date)), Math.floor(left / columnWidth)).getTime()),
                start_time: topToTime(top),
                description: description,
                location: location,
                end_time: getEndTime(startTime, endTime, topToTime(top)),
                event_id: eventId
            })
                .then(res => {
                    const { status } = res;
                    if(status === RESPONSE_STATUS.SUCCESS) getVUEvents();
                    else toast('Error updating event');
                })
                .catch(err => toast('Error updating event'));
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
        else setPosChange(posChange + 1);
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
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', onDragEnd);
    }

    return <>
        <div 
            className={cx(styles.container, {[styles.dragging]: dragging[eventId]})} 
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
                <div className={cx(styles.time)}>{startTime}</div>
                <div className={cx(styles.time)}>{endTime}</div>
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
            loggedBy={loggedBy}
            eventId={eventId}
            attendance={true}
            getVUEvents={getVUEvents}
        />}
    </>
}, (prevProps, nextProps) => {
    // if(nonDraggingPropsChange(prevProps, nextProps)) return false;
    // if(!prevProps.dragging && !nextProps.dragging) return true;
    return false;
});