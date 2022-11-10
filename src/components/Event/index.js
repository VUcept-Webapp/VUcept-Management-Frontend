import styles from './index.module.css';
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { getDay, getEventHeight, getEventTop, getEventWidth, getLeftFromDay, getMinDiff, nonDraggingPropsChange, yyyymmddToDateObj } from '../../lib/util';
import { EventDetails } from '../EventDetails';
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
        title,
        date,
        startTime,
        endTime,
        location,
        description,
        attendance,
        events,
        eventId
    } = props;
    const [left, setLeft] = useState(40);
    const [top, setTop] = useState(getEventTop(startTime));
    const [showEdit, setShowEdit] = useState(false);
    const initDrag = useRef({ x: 0, y: 0, left: 0, top: 0 });
    const dragRef = useRef();
    const eventElement = useRef();
    const day = getDay(yyyymmddToDateObj(date));
    const timeDiff = getMinDiff(startTime, endTime);
    const { width: eventWidth, left: eventExtraLeft } = getEventWidth(events, { startTime, endTime }, columnWidth, eventId);

    useEffect(() => {
        setLeft(getLeftFromDay({ day, columnWidth }));
    }, [day, columnWidth]);

    useEffect(() => {
        if(dragging) setLeft(40 + (hoverCol - 1) * columnWidth);
    }, [dragging, hoverCol]);

    const onDrag = (e) => {
        setDragging(true);
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
        if(!dragRef.current) {
            console.log('click');
            setShowEdit(true);
        }
        setDragging(false);
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
            className={cx(styles.container)} 
            style={{ 
                width: `${dragging ? columnWidth : eventWidth}px`,
                height: `${getEventHeight(timeDiff)}px`,
                left: `${dragging ? left : left + eventExtraLeft}px`,
                top: `${top}px`
            }}
            onMouseDown={onDragStart}
            ref={eventElement}
        >
            {(dragging || eventWidth >= 130) && <div className={cx(styles.times)}>
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
            attendance={attendance}
        />}
    </>
}, (prevProps, nextProps) => {
    if(nonDraggingPropsChange(prevProps, nextProps)) return false;
    if(!prevProps.dragging && !nextProps.dragging) return true;
    return false;
});