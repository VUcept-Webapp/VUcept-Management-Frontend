import styles from './index.module.css';
import classNames from 'classnames/bind';
import { RESPONSE_STATUS, TABLE } from '../../lib/constants';
import { Table } from '../../components/Table';
import { useEffect, useRef, useState } from 'react';
import { TableSelect } from '../../components/TableSelect';
import { LogButton } from '../../components/LogButton';
import { TableItem } from '../../components/TableItem';
import { TableButton } from '../../components/TableButton';
import { checkInputRows, getSortParam, toUpperRows, updateOrder } from '../../lib/util';
import { useAuth, useAuthenticatedRequest } from '../../lib/hooks';
const cx = classNames.bind(styles);

// Attendance logging page
export const LogAttendance = ({ toast }) => {
    const { auth, token } = useAuth();
    const { post, get } = useAuthenticatedRequest();
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
        get({
            url: '/getLogVisionsEvents',
            params: { visions: auth?.visions },
            onResolve: res => {
                const { status, events } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    setEvents(events);
                    if(events.length) setEvent(events[0]);
                }
                else toast("Failed to obtain events")
            },
            onReject: () => toast("Internal error")
        });
    }

    // obtain attendance records
    const getAttendance = () => {
        get({
            url: '/readLogAttendance',
            params: {
                event_id: JSON.stringify(event.event_id),
                visions: auth?.visions,
                row_start: tablePage * TABLE.ROW_PER_PAGE, 
                row_num: TABLE.ROW_PER_PAGE,
                ...(nameSearch && { name_search: JSON.stringify([nameSearch]) }),
                ...(nameSort && { name_sort: nameSort }),
                ...(emailSearch && { email_search: JSON.stringify([emailSearch]) }),
                ...(emailSort && { email_sort: emailSort }),
                ...(orderRef.current.length > 0 && { condition_order: JSON.stringify(orderRef.current) }),
            },
            onResolve: res => {
                const { status, result: { rows, pageNum } } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    setRows(toUpperRows(rows));
                    setTotalPage(parseInt(pageNum));
                }
                else toast('Internal error');
            },
            onReject: () => toast('Internal error')
        });
    }

    useEffect(() => {
        rowsRef.current = rows;
    }, [rows]);

    useEffect(() => {
        if(auth?.visions) getEvents();
    }, [auth, token]);

    useEffect(() => {
        if(event && auth?.visions) getAttendance();
    }, [tablePage, nameSearch, nameSort, emailSearch, emailSort, event, auth, token]);

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
        post({
            url: '/submitAttendance',
            params: { edits: inputRows.map(row => ({ email: row.email, eventId: event.event_id, attendance: row.attendance })) },
            onResolve: res => {
                const { status } = res;
                if(status !== RESPONSE_STATUS.SUCCESS) toast('Error submitting attendance');
            },
            onReject: () => toast('Error submitting attendance')
        });
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