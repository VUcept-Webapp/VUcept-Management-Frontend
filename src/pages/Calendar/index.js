import styles from './index.module.css';
import classNames from 'classnames/bind';
import LeftArrowButton from '../../assets/icons/leftArrowButton.svg';
import RightArrowButton from '../../assets/icons/rightArrowButton.svg';
import TimeIcon from '../../assets/icons/time.svg';
import { useWeek, useWindowSize } from '../../lib/hooks';
import { Event } from '../../components/Event';
import { useRef, useState } from 'react';
import { CreateEvent } from '../../components/CreateEvent';
import { addDays, formatGetTime, formatTime } from '../../lib/util';
const cx = classNames.bind(styles);

// Calendar page
export const Calendar = ({ toast }) => {
    const { width, type } = useWindowSize();
    const { currentWeek, setCurrentWeek, setPrevWeek, setNextWeek } = useWeek();
    const { startYear, startMonth, startDate, endYear, endMonth, endDate } = currentWeek;
    const calendarRef = useRef();
    const columnRef = useRef();
    const [hoverCol, setHoverCol] = useState(-1);
    const [dragging, setDragging] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [dragging1, setDragging1] = useState(false);
    const [dragging2, setDragging2] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [newEventStartTime, setNewEventStartTime] = useState('');
    const [newEventDate, setNewEventDate] = useState('');

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

    return <>
        {showCreate && <CreateEvent 
            startTime={newEventStartTime}
            setShowPopUp={setShowCreate}
            date={newEventDate}
        />}
        <div className={cx(styles.controlContainer)}>
            <img src={LeftArrowButton} className={cx(styles.arrowIcon)} onClick={() => setPrevWeek()}/>
            <span>{`${startMonth}/${startDate}, ${startYear} - ${endMonth}/${endDate}, ${endYear}`}</span>
            <img src={RightArrowButton} className={cx(styles.arrowIcon)} onClick={() => setNextWeek()}/>
        </div>
        <div className={cx(styles.calendar)} ref={calendarRef} id='calendar' onScroll={(e) => setScrollTop(e.target.scrollTop)}>
            {constructHeader()}
            {constructRows()}
            <Event 
                scrollTop={scrollTop}
                calendarWidth={calendarRef?.current?.offsetWidth}
                calendarHeight={calendarRef?.current?.offsetHeight}
                columnWidth={columnRef?.current?.offsetWidth}
                hoverCol={hoverCol}
                dragging={dragging1}
                setDragging={setDragging1}
                title={'test title1'}
                date={'2022-11-10'}
                startTime={'12:18'}
                endTime={'14:27'}
                location={'FGH'}
                description={'event1'}
                attendance={true}
                eventId='event1'
                events={[{startTime: '12:18', endTime: '14:27', eventId: 'event1'}, {startTime: '11:23', endTime: '13:47', eventId: 'event2'}]}
            />
            {<Event
                scrollTop={scrollTop}
                calendarWidth={calendarRef?.current?.offsetWidth}
                calendarHeight={calendarRef?.current?.offsetHeight}
                columnWidth={columnRef?.current?.offsetWidth}
                hoverCol={hoverCol}
                dragging={dragging2}
                setDragging={setDragging2}
                title={'test title2'}
                date={'2022-11-10'}
                startTime={'11:23'}
                endTime={'13:47'}
                location={'FGH'}
                description={'event2'}
                attendance={true}
                eventId='event2'
                events={[{startTime: '12:18', endTime: '14:27', eventId: 'event1'}, {startTime: '11:23', endTime: '13:47', eventId: 'event2'}]}
            />}
        </div>
    </>
}