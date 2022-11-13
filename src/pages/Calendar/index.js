import styles from './index.module.css';
import classNames from 'classnames/bind';
import LeftArrowButton from '../../assets/icons/leftArrowButton.svg';
import RightArrowButton from '../../assets/icons/rightArrowButton.svg';
import TimeIcon from '../../assets/icons/time.svg';
import { useWeek, useWindowSize } from '../../lib/hooks';
import { Event } from '../../components/Event';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CreateEvent } from '../../components/CreateEvent';
import { addDays, formatGetTime, formatTime, transformEvents } from '../../lib/util';
import { readVUEvent } from '../../lib/services';
import { RESPONSE_STATUS } from '../../lib/constants';
const cx = classNames.bind(styles);

// Calendar page
export const Calendar = ({ toast }) => {
    const { width, type } = useWindowSize();
    const { currentWeek, setCurrentWeek, setPrevWeek, setNextWeek } = useWeek();
    const { startYear, startMonth, startDate, endYear, endMonth, endDate } = currentWeek;
    const calendarRef = useRef();
    const columnRef = useRef();
    const [hoverCol, setHoverCol] = useState(-1);
    const [dragging, setDragging] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const [showCreate, setShowCreate] = useState(false);
    const [newEventStartTime, setNewEventStartTime] = useState('');
    const [newEventDate, setNewEventDate] = useState('');
    const [events, setEvents] = useState([]);

    const onCreate = ({ hour, min, day }) => {
        const { startYear, startMonth, startDate } = currentWeek;
        setNewEventStartTime(formatTime({ hour, min }));
        setNewEventDate(formatGetTime(addDays(new Date(startYear, startMonth - 1, startDate), day).getTime()));
        setShowCreate(true);
    }

    const constructHeader = () => {
        let headers = [];
        headers.push(<div className={cx(styles.topLeft)}>
            <img src={TimeIcon} className={cx(styles.timeIcon)}/>
        </div>);
        headers.push(<div className={cx(styles.col, styles.row, styles.header)} ref={columnRef}><span>Monday</span></div>);
        headers.push(<div className={cx(styles.col, styles.row, styles.header)}><span>Tuesday</span></div>);
        headers.push(<div className={cx(styles.col, styles.row, styles.header)}><span>Wednesday</span></div>);
        headers.push(<div className={cx(styles.col, styles.row, styles.header)}><span>Thursday</span></div>);
        headers.push(<div className={cx(styles.col, styles.row, styles.header)}><span>Friday</span></div>);
        headers.push(<div className={cx(styles.col, styles.row, styles.header)}><span>Saturday</span></div>);
        headers.push(<div className={cx(styles.col, styles.row, styles.header)}><span>Sunday</span></div>);
        return headers;
    }

    const constructRow = (hour) => {
        let row = [];
        row.push(<div className={cx(styles.col, styles.row, styles.colFirst, styles.block)}><span className={cx(styles.hour)}>{hour}</span></div>);
        for(let i = 1; i <= 7; ++i) {
            row.push(<div className={cx(styles.col, styles.row, styles.block)} onMouseOver={() => setHoverCol(i)}>
                <div className={cx(styles.halfRow)} onClick={() => onCreate({ hour, min: 0, day: i - 1 })}></div>
                <div className={cx(styles.halfRow)} onClick={() => onCreate({ hour, min: 30, day: i - 1 })}></div>
            </div>);
        }
        return row;
    }

    const constructRows = () => {
        const rows = [];
        for(let i = 0; i < 24; ++i) {
            rows.push(constructRow(i));
        }
        return rows;
    }

    const getVUEvents = useCallback(() => {
        if(Object.keys(currentWeek).length) {
            readVUEvent({ time_range: JSON.stringify([startYear + '-' + startMonth + '-' + startDate, endYear + '-' + endMonth + '-' + endDate]) })
                .then(res => {
                    const { status, result } = res;
                    if(status === RESPONSE_STATUS.SUCCESS) {
                        setEvents(transformEvents(result));
                    }
                    else toast('Error fetching events');
                })
                .catch(err => toast('Error fetching events'));
        }
    }, [currentWeek]);

    useEffect(() => {
        getVUEvents();
    }, [currentWeek]);

    useEffect(() => {
        const draggingMap = {};
        for(const { eventId } of events) {
            draggingMap[eventId] = false;
        }
        setDragging(draggingMap);
    }, [events]);

    return <>
        {showCreate && <CreateEvent 
            startTime={newEventStartTime}
            setShowPopUp={setShowCreate}
            date={newEventDate}
            getVUEvents={getVUEvents}
        />}
        <div className={cx(styles.controlContainer)}>
            <img src={LeftArrowButton} className={cx(styles.arrowIcon)} onClick={() => setPrevWeek()}/>
            <span>{`${startMonth}/${startDate}, ${startYear} - ${endMonth}/${endDate}, ${endYear}`}</span>
            <img src={RightArrowButton} className={cx(styles.arrowIcon)} onClick={() => setNextWeek()}/>
        </div>
        <div className={cx(styles.calendar)} ref={calendarRef} id='calendar' onScroll={(e) => setScrollTop(e.target.scrollTop)}>
            {constructHeader()}
            {constructRows()}
            {events?.map((event, i) => <Event 
                scrollTop={scrollTop}
                calendarWidth={calendarRef?.current?.offsetWidth}
                calendarHeight={calendarRef?.current?.offsetHeight}
                columnWidth={columnRef?.current?.offsetWidth}
                hoverCol={hoverCol}
                dragging={dragging}
                setDragging={setDragging}
                attendance={true}
                idx={i}
                events={events}
                getVUEvents={getVUEvents}
            />)}
        </div>
    </>
}