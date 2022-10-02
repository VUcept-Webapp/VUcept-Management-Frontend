import styles from './index.module.css';
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { getAlignedLeft, getLeftFromDay, nonDraggingPropsChange } from '../../lib/util';
const cx = classNames.bind(styles);


export const Event = React.memo((props) => {
    const {
        day,
        hoverCol,
        scrollTop,
        calendarHeight,
        calendarWidth,
        dragging,
        setDragging,
        columnWidth,
    } = props;

    const [left, setLeft] = useState(40);
    const [top, setTop] = useState(185);
    const initDrag = useRef({ x: 0, y: 0, left: 0, top: 0 });
    const dragRef = useRef();
    const eventElement = useRef();

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

    return <div 
        className={cx(styles.container)} 
        style={{ 
            width: `${columnWidth}px`,
            left: `${left}px`,
            top: `${top}px`
        }}
        onMouseDown={onDragStart}
        ref={eventElement}
    >

    </div>
}, (prevProps, nextProps) => {
    if(nonDraggingPropsChange(prevProps, nextProps)) return false;
    if(!prevProps.dragging && !nextProps.dragging) return true;
    return false;
})