import styles from './index.module.css';
import classNames from 'classnames/bind';
import { BUTTONS, USER_TYPE_OPTIONS, WINDOW_TYPE } from '../../lib/constants';
import { TableButton } from '../../components/TableButton';
import { Table } from '../../components/Table';
import { useCallback, useRef, useState } from 'react';
import { PopUpDeleteRow } from '../../components/PopUpDeleteRow';
import { PopUpEditRecord } from '../../components/PopUpEditRecord';
import { TableSelect } from '../../components/TableSelect';
import { useWindowSize } from '../../lib/hooks';
import { debounce, getOptionValue, getSortParam, updateOrder } from '../../lib/util';
import { TableItem } from '../../components/TableItem';
import { CalendarComponent } from '../../components/CalendarComponent';
const cx = classNames.bind(styles);

export const VUceptorAttendance = () => {
    const { width, type } = useWindowSize();
    const isMobile = type === WINDOW_TYPE.MOBILE;
    const isSmall = width < 840 || isMobile;
    const [rows, setRows] = useState([]);
    const [showDeletePopUp, setShowDeletePopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);
    const [deleteRow, setDeleteRow] = useState(null);
    const [editRow, setEditRow] = useState(null);
    const [timeRange, setTimeRange] = useState(null);
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
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const orderRef = useRef([]);

    const onEditRow = (row) => {
        setShowEditPopUp(true);
        setEditRow(row);
    }

    const onDeleteRow = (row) => {
        setShowDeletePopUp(true);
        setDeleteRow(row);
    }

    const postAbsence = (absenceCount) => {
        console.log(absenceCount);
    }
    let debouncedPostAbsence = useCallback(debounce(postAbsence, 1000), []);

    const onAbsenceChange = (event) => {
        let val = parseInt(event.target.value) || '';
        if(typeof val === 'number' && val < 0) val = 0;
        setAbsence(val);
        debouncedPostAbsence(val);
    }

    const onConfirmDelete = () => {
        
    }

    const onSaveEdit = () => {

    }

    const onPageChange = (curPage) => {
        setTablePage(curPage - 1);
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
                options: ['VUCeptor', 'Advisor', 'Board']
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
                options: ['VUCeptor', 'Advisor', 'Board']
            },
            sort: (value) => {
                updateOrder({ order: orderRef.current, value, key: 'event_sort' });
                setEventSort(getSortParam(value));
            },
            render: (val) => <TableItem item={val} />
        },
        {
            key: 'status',
            label: 'Status',
            filter: {
                callback: (value) => setStatusFilter(getOptionValue(value)),
                options: ['Attended', 'Absent']
            },
            render: (val) => <TableItem item={val} />
        },
    ];
    
    return <>
        <div className={cx(styles.boardControl)}>
            <div className={cx(styles.selectContainer, {[styles.small]: isSmall})}>
                <span className={cx(styles.calendarLabel, {[styles.small]: isSmall})}>Start Date:</span>
                <CalendarComponent />
            </div>
            <div className={cx(styles.selectContainer, {[styles.small]: isSmall})}>
                <span className={cx(styles.calendarLabel, {[styles.small]: isSmall})}>End Date:</span>
                <CalendarComponent />
            </div>
            <div className={cx(styles.selectContainer, {[styles.small]: isSmall})}>
                <span className={cx(styles.selectLabel, {[styles.small]: isSmall})}>Absences:</span>
                <input
                    className={cx(styles.controlInput)}
                    value={absence}
                    onChange={onAbsenceChange}
                />
            </div>
            <TableButton className={cx(styles.tableButton)} label={BUTTONS.EXPORT}/>
        </div>
        <div className={styles.table}>
            <Table
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
        <PopUpEditRecord
            row={editRow}
            title={'Edit User'}
            show={showEditPopUp} 
            setShow={setShowEditPopUp}
            onSave={onSaveEdit}
        />
    </>
}