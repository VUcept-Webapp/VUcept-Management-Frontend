import styles from './index.module.css';
import classNames from 'classnames/bind';
import { BUTTONS, RESPONSE_STATUS, TABLE, WINDOW_TYPE } from '../../lib/constants';
import { TableButton } from '../../components/TableButton';
import { Table } from '../../components/Table';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PopUpDeleteRow } from '../../components/PopUpDeleteRow';
import { useWindowSize } from '../../lib/hooks';
import { debounce, formatGetTime, getOptionValue, getSortParam, toUpperRows, updateOrder } from '../../lib/util';
import { TableItem } from '../../components/TableItem';
import { CalendarComponent } from '../../components/CalendarComponent';
import { toast } from 'react-toastify';
import { deleteVUAttendance, editVUAttendance, exportVUAttendance, getVUAttendanceEventsList, getVUAttendanceVisionsList, readVUAttendance } from '../../lib/services';
import { BlockBlocker } from '../../components/BlockBlocker';
import { PopUpEditAttendance } from '../../components/PopUpEditAttendance';
const cx = classNames.bind(styles);

// VUceptor attendance page
export const VUceptorAttendance = ({ taost }) => {
    const { width, type } = useWindowSize();
    const isMobile = type === WINDOW_TYPE.MOBILE;
    const isSmall = width < 840 || isMobile;
    const [visionsOptions, setVisionOptions] = useState([]);
    const [eventOptions, setEventOptions] = useState([]);
    const [rows, setRows] = useState([]);
    const [showDeletePopUp, setShowDeletePopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);
    const [deleteRow, setDeleteRow] = useState(null);
    const [editRow, setEditRow] = useState(null);
    const [tablePage, setTablePage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [absence, setAbsence] = useState('');
    const [nameSort, setNameSort] = useState(null);
    const [nameSearch, setNameSearch] = useState("");
    const [emailSort, setEmailSort] = useState(null);
    const [emailSearch, setEmailSearch] = useState("");
    const [visionsFilter, setVisionsFilter] = useState([]);
    const [visionsSort, setVisionsSort] = useState([]);
    const [eventFilter, setEventFilter] = useState([]);
    const [eventSort, setEventSort] = useState(null);
    const [statusFilter, setStatusFilter] = useState([]);
    const [startDate, setStartDate] = useState(new Date().getTime());
    const [endDate, setEndDate] = useState(new Date().getTime());
    const [disableTable, setDisableTable] = useState(false);
    const [presenceNum, setPresenceNum] = useState('');
    const orderRef = useRef([]);

    const getAttendance = () => {
        if(new Date(startDate) > new Date(endDate)) toast('Start date must not be later than end date');
        else {
            getVUAttendanceVisionsList().then(res => {
                const { status, data } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    setVisionOptions(data.map(option => option.toString()));
                }
                else toast('Error fetching visions options');
            }).catch(err => toast('Error fetching visions options'));
            getVUAttendanceEventsList().then(res => {
                const { status, data } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    setEventOptions(data.map(option => option.title.toString()));
                }
                else toast('Error fetching events options');
            }).catch(err => toast('Error fetching events options'));
            setDisableTable(true);
            readVUAttendance({ 
                time_range: JSON.stringify([formatGetTime(startDate), formatGetTime(endDate)]),
                row_start: tablePage * TABLE.ROW_PER_PAGE, 
                row_num: TABLE.ROW_PER_PAGE,
                ...(presenceNum && { num_presence: presenceNum }),
                ...(nameSearch && { name_search: JSON.stringify([nameSearch]) }),
                ...(nameSort && { name_sort: nameSort }),
                ...(emailSearch && { email_search: JSON.stringify([emailSearch]) }),
                ...(emailSort && { email_sort: emailSort }),
                ...(visionsSort && { visions_sort: visionsSort }),
                ...(visionsFilter.length > 0 && { visions_filter: JSON.stringify(visionsFilter) }),
                ...(eventSort && { events_sort: eventSort }),
                ...(eventFilter.length > 0 && { events_filter: JSON.stringify(eventFilter) }),
                ...(statusFilter.length > 0 && { status_filter: JSON.stringify(statusFilter) }),
                ...(orderRef.current.length > 0 && { condition_order: JSON.stringify(orderRef.current) }),
            }).then(res => {
                const { status, result: { rows = [], pageNum = 1 } } = res;
                setDisableTable(false);
                if(status === RESPONSE_STATUS.SUCCESS) {
                    setRows(toUpperRows(rows));
                    setTotalPage(parseInt(pageNum));
                }
                else toast('Internal error');
            })
            .catch(err => {
                setDisableTable(false);
                toast('Internal error');
            });
        }
    }

    const onEditRow = (row) => {
        setShowEditPopUp(true);
        setEditRow(row);
    }

    const onDeleteRow = (row) => {
        setShowDeletePopUp(true);
        setDeleteRow(row);
    }

    const postAbsence = (count) => {
        setPresenceNum(count);
    }
    let debouncedPostAbsence = useCallback(debounce(postAbsence, 500), []);

    const onAbsenceChange = (event) => {
        let val = parseInt(event.target.value) || '';
        if(typeof val === 'number' && val < 0) val = 0;
        setAbsence(val);
        debouncedPostAbsence(val);
    }

    const onConfirmDelete = () => {
        deleteVUAttendance({ email: deleteRow?.email || "", event: deleteRow?.event })
            .then(res => {
                setShowDeletePopUp(false);
                const { status } = res;
                if(status === RESPONSE_STATUS.SUCCESS) getAttendance();
                else if(status === RESPONSE_STATUS.INVALID_VU_EVENT) toast('Event is not found');
                else if(status === RESPONSE_STATUS.INVALID_USER) toast('User is not found');
                else if(status === RESPONSE_STATUS.NO_EXISTING_RECORDS) toast('Record is not found');
                else toast('Internal error');
            })
            .catch(err => toast('Internal error'));
    }

    const onSaveEdit = (inputs) => {
        const { inputEmail, inputEvent, inputStatus } = inputs;
        editVUAttendance({ email: inputEmail, eventId: inputEvent, attendance: inputStatus })
            .then(res => {
                const { status } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    setShowEditPopUp(false);
                    getAttendance();
                }
                else toast('Internal error');
            })
            .catch(err => toast('Internal error'));
    }

    const onPageChange = (curPage) => {
        setTablePage(curPage - 1);
    }

    const onExport = () => {
        exportVUAttendance()
            .then(res => {
                const { status, data } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    const csvContent = `data:text/csv;charset=utf-8,${data}`;
                    const encodedURI = encodeURI(csvContent);
                    window.open(encodedURI);
                }
                else toast('Internal error');
            })
            .catch(err => toast('Internal error'));
    }   

    const columns = [
        {
            key: 'name',
            label: 'Name',
            search: (value) => setNameSearch(value),
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
            search: (value) => setEmailSearch(value),
            render: (val) => <TableItem item={val} />
        },
        {
            key: 'visions',
            label: 'Visions',
            filter: {
                callback: (value) => setVisionsFilter(getOptionValue(value)),
                options: visionsOptions
            },
            sort: (value) => {
                updateOrder({ order: orderRef.current, value, key: 'visions_sort' });
                setVisionsSort(getSortParam(value));
            },
            render: (val) => <TableItem item={val} />
        },
        {
            key: 'event',
            label: 'Event',
            filter: {
                callback: (value) => setEventFilter(getOptionValue(value)),
                options: eventOptions
            },
            sort: (value) => {
                updateOrder({ order: orderRef.current, value, key: 'events_sort' });
                setEventSort(getSortParam(value));
            },
            render: (val) => <TableItem item={val} />
        },
        {
            key: 'status',
            label: 'Status',
            filter: {
                callback: (value) => setStatusFilter(getOptionValue(value)),
                options: ['Present', 'Absent', 'Excused']
            },
            render: (val) => <TableItem item={val} />
        },
    ];

    useEffect(() => {
        getAttendance();
    }, [tablePage, presenceNum, nameSearch, nameSort, emailSearch, emailSort, 
        visionsFilter, visionsSort, eventFilter, eventSort, statusFilter, startDate, endDate]);
    
    return <>
        <BlockBlocker show={disableTable}/>
        <div className={cx(styles.boardControl)}>
            <div className={cx(styles.selectContainer, {[styles.small]: isSmall})}>
                <span className={cx(styles.calendarLabel, {[styles.small]: isSmall})}>Start Date:</span>
                <CalendarComponent onDateChange={(val) => setStartDate(val)}/>
            </div>
            <div className={cx(styles.selectContainer, {[styles.small]: isSmall})}>
                <span className={cx(styles.calendarLabel, {[styles.small]: isSmall})}>End Date:</span>
                <CalendarComponent onDateChange={(val) => setEndDate(val)}/>
            </div>
            <div className={cx(styles.selectContainer, {[styles.small]: isSmall})}>
                <span className={cx(styles.selectLabel, {[styles.small]: isSmall})}>Presence:</span>
                <input
                    className={cx(styles.controlInput)}
                    value={absence}
                    onChange={onAbsenceChange}
                />
            </div>
            <TableButton className={cx(styles.tableButton)} label={BUTTONS.EXPORT} onClick={onExport}/>
        </div>
        <div className={styles.table}>
            <Table
                tablePage={tablePage + 1}
                totalPage={totalPage}
                rowNumber={200}
                columns={columns}
                onEditRow={onEditRow}
                onDeleteRow={onDeleteRow}
                rows={rows}
                onPageChange={onPageChange}
            />
        </div>
        <PopUpDeleteRow
            show={showDeletePopUp}
            setShow={setShowDeletePopUp}
            title={'Remove Record'}
            description={'Confirm to remove record'}
            row={deleteRow}
            onDelete={onConfirmDelete}
        />
        {showEditPopUp && <PopUpEditAttendance
            row={editRow}
            title={'Edit Attendace'}
            show={showEditPopUp} 
            setShow={setShowEditPopUp}
            onSave={onSaveEdit}
        />}
    </>
}