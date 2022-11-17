import styles from './index.module.css';
import classNames from 'classnames/bind';
import { LOG_ATTENDANCE_ROWS_TEST, RESPONSE_STATUS, TABLE, USER_TYPE_OPTIONS } from '../../lib/constants';
import { Table } from '../../components/Table';
import { useEffect, useRef, useState } from 'react';
import { TableSelect } from '../../components/TableSelect';
import { LogButton } from '../../components/LogButton';
import { TableItem } from '../../components/TableItem';
import { TableButton } from '../../components/TableButton';
import { checkInputRows, getSortParam, toUpperRows, updateOrder } from '../../lib/util';
import { getLogVisionsEvents, readLogAttendance, submitAttendance } from '../../lib/services';
import { useAuth } from '../../lib/hooks';
const cx = classNames.bind(styles);

// Attendance logging page
export const LogAttendance = ({ toast }) => {
    const { auth } = useAuth();
    const [event, setEvent] = useState(null);
    const [tablePage, setTablePage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [nameSort, setNameSort] = useState(null);
    const [nameSearch, setNameSearch] = useState("");
    const [emailSort, setEmailSort] = useState(null);
    const [emailSearch, setEmailSearch] = useState("");
    const [events, setEvents] = useState([]);
    const [rows, setRows] = useState([]);
    const rowsRef = useRef();
    const orderRef = useRef([]);

    const onPageChange = (curPage) => {
        setTablePage(curPage - 1);
    }

    // obtain all events
    const getEvents = () => {
        getLogVisionsEvents({ visions: auth?.visions })
            .then(res => {
                const { status, data } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    setEvents(data);
                    if(data.length) setEvent(data[0]);
                }
                else toast("Failed to obtain events")
            })
            .catch(err => toast("Internal error"));
    }

    // obtain attendance records
    const getAttendance = () => {
        readLogAttendance({
            event: JSON.stringify(event.title),
            visions: auth?.visions,
            row_start: tablePage * TABLE.ROW_PER_PAGE, 
            row_num: TABLE.ROW_PER_PAGE,
            ...(nameSearch && { name_search: JSON.stringify([nameSearch]) }),
            ...(nameSort && { name_sort: nameSort }),
            ...(emailSearch && { email_search: JSON.stringify([emailSearch]) }),
            ...(emailSort && { email_sort: emailSort }),
            ...(orderRef.current.length > 0 && { condition_order: JSON.stringify(orderRef.current) }),
        }).then(res => {
            const { status, result: { rows, pageNum } } = res;
            if(status === RESPONSE_STATUS.SUCCESS) {
                setRows(toUpperRows(rows));
                setTotalPage(parseInt(pageNum));
            }
            else toast('Internal error');
        })
        .catch(err => toast('Internal error'));
    }

    useEffect(() => {
        rowsRef.current = rows;
    }, [rows]);

    useEffect(() => {
        if(auth?.visions) getEvents();
    }, [auth]);

    useEffect(() => {
        if(event && auth?.visions) getAttendance();
    }, [tablePage, nameSearch, nameSort, emailSearch, emailSort, event, auth]);

    const LOG_ATTENDANCE_COLUMNS = [
        {
            key: 'name',
            label: 'Name',
            search: (value) => {
                setTablePage(0);
                setNameSearch(value);
            },
            sort: (value) => {
                updateOrder({ order: orderRef.current, value, key: 'name_sort' });
                setNameSort(getSortParam(value));
            },
            render: (val) => <TableItem item={val} />
        },
        {
            key: 'email',
            label: 'Email',
            sort: (value) => {
                updateOrder({ order: orderRef.current, value, key: 'email_sort' });
                setEmailSort(getSortParam(value));
            },
            search: (value) => {
                setTablePage(0);
                setEmailSearch(value);
            },
            render: (val) => <TableItem item={val} />
        },
        {
            key: 'attendance',
            label: 'Attendance',
            render: (val, rowI) => <LogButton val={val} rowI={rowI} ref={rowsRef}/>
        },
    ];

    const onSubmit = () => {
        const inputRows = rowsRef?.current || [];
        if(!checkInputRows(inputRows)) {
            toast('Please log all students');
            return;
        }
        console.log(inputRows);
        submitAttendance({ edits: inputRows.map(row => ({ email: row.email, eventId: event.event_id, attendance: row.attendance })) })
            .then(res => {
                const { status } = res;
                if(status === RESPONSE_STATUS.ERROR) toast('Error submitting attendance');
            })
            .catch(err => toast('Error submitting attendance'));
    }
    
    
    return <>
        <div className={cx(styles.boardControl)}>
            <span className={cx(styles.selectLabel)}>Event:</span>
            <TableSelect
                options={events?.map(event => ({ label: event?.title, value: event }))}
                className={cx(styles.select)}
                height={25}
                selected={{ label: event?.title, value: event }}
                warn={false}
                onChange={({ value }) => setEvent(value)}
            />
        </div>
        <div className={styles.table}>
            <Table
                rowNumber={200}
                columns={LOG_ATTENDANCE_COLUMNS}
                rows={rows}
                tablePage={tablePage + 1}
                totalPage={totalPage}
                onPageChange={onPageChange}
            />
        </div>
        <div className={cx(styles.submitContainer)}><TableButton onClick={onSubmit} label={'Submit'} className={cx(styles.submit)}/></div>
    </>
}