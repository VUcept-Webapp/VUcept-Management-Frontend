import styles from './index.module.css';
import classNames from 'classnames/bind';
import Papa from "papaparse";
import LeftArrowButton from '../../assets/icons/leftArrowButton.svg';
import RightArrowButton from '../../assets/icons/rightArrowButton.svg';
import TimeIcon from '../../assets/icons/time.svg';
import { useAuth, useAuthenticatedRequest, useWeek } from '../../lib/hooks';
import { Event } from '../../components/Event';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CreateEvent } from '../../components/CreateEvent';
import { addDays, formatGetTime, formatTime, importUsersToJSON, transformEvents } from '../../lib/util';
import { EVENT_TYPE, IMPORT_EVENT, RESET_EVENT_OPTIONS, RESPONSE_STATUS, USER_TYPE } from '../../lib/constants';
import { TableSelect } from '../../components/TableSelect';
import { PopUpDeleteAll } from '../../components/PopUpDeleteAll';
const cx = classNames.bind(styles);

// Calendar page
export const Calendar = ({ toast }) => {
    const { auth } = useAuth();
    const { get, post } = useAuthenticatedRequest();
    const { currentWeek, setPrevWeek, setNextWeek } = useWeek();
    const { startYear, startMonth, startDate, endYear, endMonth, endDate } = currentWeek;
    const calendarRef = useRef();
    const columnRef = useRef();
    const uploadRef = useRef();
    const [hoverCol, setHoverCol] = useState(-1);
    const [dragging, setDragging] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const [showCreate, setShowCreate] = useState(false);
    const [newEventStartTime, setNewEventStartTime] = useState('');
    const [newEventDate, setNewEventDate] = useState('');
    const [events, setEvents] = useState([]);
    const [visions, setVisions] = useState([]);
    const [selectedVision, setSelectedVision] = useState(null);
    const [showDeleteAllPopUp, setShowDeleteAllPopUp] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [importType, setImportType] = useState(null);
    const [resetType, setResetType] = useState(null);

    const onCreate = ({ hour, min, day }) => {
        if(auth?.type === USER_TYPE.VUCEPTOR) return;
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

    useEffect(() => {
        get({
            url: '/visionsEntered',
            onResolve: res => {
                const { result: { list }, status } = res;
                if(status === RESPONSE_STATUS.SUCCESS) setVisions(list.filter(x => x?.visions !== 0).map(x => x?.visions));
                else toast('Error fetching visions');
            },
            onReject: () => toast('Error fetching visions')
        });
    }, []);

    useEffect(() => {
        if(importFile && importType) {
            Papa.parse(importFile, {
                complete: res => {
                    const { data } = res;
                    const inputObj = importUsersToJSON(data);
                    if(inputObj === 'error') {
                        toast('Please provide a valid csv file');
                        setImportFile(null);
                        setImportType(null);
                        return;
                    }
                    let upload = null;
                    if(importType?.value === 'VUceptor Events') upload = '/VUEventLoadfromcsv';
                    else if(importType?.value === 'First-year Events') upload = '/fyVisionsEventLoadfromcsv';
                    else if(importType?.value === 'First-year Info') upload = '/fyVisionsInfoLoadfromcsv';
                    if(upload) post({
                        url: upload,
                        params: { file: inputObj },
                        onResolve: res => {
                            setImportFile(null);
                            setImportType(null);
                            const { status } = res;
                            if(status === RESPONSE_STATUS.SUCCESS) getEvents();
                            else toast('Internal error');
                        },
                        onReject: () => {
                            setImportFile(null);
                            setImportType(null);
                            toast('Internal error');
                        }
                    })
                },
                error: err => {
                    setImportFile(null);
                    setImportType(null);
                }});
            if(uploadRef?.current?.value) uploadRef.current.value = '';
        }
    }, [importFile, importType]);

    const getEvents = useCallback(async () => {
        if(Object.keys(currentWeek).length) {
            const responseEvents = [];
            await get({
                url: '/readVUEvent',
                params: { time_range: JSON.stringify([startYear + '-' + startMonth + '-' + startDate, endYear + '-' + endMonth + '-' + endDate]) },
                onResolve: res => {
                    const { status, result } = res;
                    if(status === RESPONSE_STATUS.SUCCESS) {
                        responseEvents.push(...transformEvents(result, EVENT_TYPE.VUCEPTOR));
                    }
                    else toast('Error fetching VUceptor events');
                },
                onReject: () => toast('Error fetching VUceptor events')
            })
            if(selectedVision) {
                await get({
                    url: '/readfyEvent',
                    params: { 
                        time_range: JSON.stringify([startYear + '-' + startMonth + '-' + startDate, endYear + '-' + endMonth + '-' + endDate]),
                        visions: selectedVision
                    },
                    onResolve: res => {
                        const { status, result } = res;
                        if(status === RESPONSE_STATUS.SUCCESS) {
                            responseEvents.push(...transformEvents(result, EVENT_TYPE.FIRST_YEAR));
                        }
                        else toast('Error fetching first-year events');
                    },
                    onReject: () => toast('Error fetching first-year events')
                })
            }
            setEvents(responseEvents);
        }
    }, [currentWeek, selectedVision]);

    const resetEvents = useCallback(() => {
        if(resetType) {
            let reset = resetType === 'VUceptor Events' ? '/resetVUEvent' : '/resetfyEvent';
            post({
                url: reset,
                onResolve: res => {
                    const { status } = res;
                    if(status === RESPONSE_STATUS.SUCCESS) getEvents();
                    else toast('Error resetting events');
                    setShowDeleteAllPopUp(false)
                },
                onReject: () => {
                    toast('Error resetting events');
                    setShowDeleteAllPopUp(false);
                }
            });
        }
    }, [resetType]);

    useEffect(() => {
        getEvents();
    }, [currentWeek, selectedVision]);

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
            getEvents={getEvents}
            vision={selectedVision}
        />}
        <div className={cx(styles.controlContainer)}>
            <img src={LeftArrowButton} className={cx(styles.arrowIcon)} onClick={() => setPrevWeek()}/>
            <span>{`${startMonth}/${startDate}, ${startYear} - ${endMonth}/${endDate}, ${endYear}`}</span>
            <img src={RightArrowButton} className={cx(styles.arrowIcon)} onClick={() => setNextWeek()}/>
            {auth?.type !== USER_TYPE.VUCEPTOR && <TableSelect 
                className={cx(styles.import)}
                options={IMPORT_EVENT}
                selected={importType}
                onChange={(selected) => {
                    uploadRef?.current?.click();
                    setImportType(selected);
                }}
                placeholder={'Import'}
            />}
            <TableSelect 
                className={cx(styles.vision, {[styles.vuceptor]: auth?.type === USER_TYPE.VUCEPTOR})}
                options={visions.map(v => ({label: `group ${v}`, value: v}))}
                selected={selectedVision !== null ? { label: `group ${selectedVision}`, value: selectedVision } : null}
                onChange={(selected) => {
                    if(!selected) setSelectedVision(null);
                    else setSelectedVision(selected.value);
                }}
                isClearable
                placeholder={'Vision'}
            />
            {auth?.type !== USER_TYPE.VUCEPTOR && <TableSelect 
                className={cx(styles.reset)}
                options={RESET_EVENT_OPTIONS}
                selected={null}
                onChange={(selected) => {
                    setResetType(selected?.value);
                    setShowDeleteAllPopUp(true);
                }}
                placeholder={'Reset'}
            />}
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
                getEvents={getEvents}
                vision={selectedVision}
            />)}
        </div>
        {showDeleteAllPopUp && <PopUpDeleteAll
            show={showDeleteAllPopUp}
            setShow={setShowDeleteAllPopUp}
            title={'Clear'}
            description={'Are you sure you want to reset the events'}
            onDelete={resetEvents}
        />}
        <input
           type="file"
           accept='.csv'
           ref={uploadRef}
           style={{ display: 'none' }}
           onChange={(e) => setImportFile(e.target.files[0])}
        />
    </>
}