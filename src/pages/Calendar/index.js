import styles from './index.module.css';
import classNames from 'classnames/bind';
import LeftArrowButton from '../../assets/icons/leftArrowButton.svg';
import RightArrowButton from '../../assets/icons/rightArrowButton.svg';
import TimeIcon from '../../assets/icons/time.svg';
import { useWeek, useWindowSize } from '../../lib/hooks';
import { Event } from '../../components/Event';
import { useRef, useState } from 'react';
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
                <div className={cx(styles.halfRow)}></div>
                <div className={cx(styles.halfRow)}></div>
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
        <div className={cx(styles.controlContainer)}>
            <img src={LeftArrowButton} className={cx(styles.arrowIcon)} onClick={() => setPrevWeek()}/>
            <span>{`${startMonth}/${startDate}, ${startYear} - ${endMonth}/${endDate}, ${endYear}`}</span>
            <img src={RightArrowButton} className={cx(styles.arrowIcon)} onClick={() => setNextWeek()}/>
        </div>
        <div className={cx(styles.calendar)} ref={calendarRef} id='calendar' onScroll={(e) => setScrollTop(e.target.scrollTop)}>
            {constructHeader()}
            {constructRows()}
            <Event 
                day={1}
                scrollTop={scrollTop}
                calendarWidth={calendarRef?.current?.offsetWidth}
                calendarHeight={calendarRef?.current?.offsetHeight}
                columnWidth={columnRef?.current?.offsetWidth}
                ref={calendarRef}
                hoverCol={hoverCol}
                dragging={dragging}
                setDragging={setDragging}
                // startTime={'10:30'}
                // endTime={}
            />
        </div>
    </>
}