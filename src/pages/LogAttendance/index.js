import styles from './index.module.css';
import classNames from 'classnames/bind';
import { LOG_ATTENDANCE_ROWS_TEST, USER_TYPE_OPTIONS } from '../../lib/constants';
import { Table } from '../../components/Table';
import { useRef, useState } from 'react';
import { TableSelect } from '../../components/TableSelect';
import { LogButton } from '../../components/LogButton';
import { TableItem } from '../../components/TableItem';
import { TableButton } from '../../components/TableButton';
import { checkInputRows } from '../../lib/util';
const cx = classNames.bind(styles);

// Attendance logging page
export const LogAttendance = ({ toast }) => {
    const [event, setEvent] = useState(null);
    const [rows, setRows] = useState(LOG_ATTENDANCE_ROWS_TEST);
    const rowsRef = useRef(rows);

    const LOG_ATTENDANCE_COLUMNS = [
        {
            key: 'name',
            label: 'Name',
            sort: true,
            search: true,
            render: (val) => <TableItem item={val} />
        },
        {
            key: 'email',
            label: 'Email',
            sort: true,
            search: true,
            render: (val) => <TableItem item={val} />
        },
        {
            key: 'attendance',
            label: 'Attendance',
            render: (val, rowI) => <LogButton val={val} rowI={rowI} rows={rows} setRows={setRows} ref={rowsRef}/>
        },
    ];

    const onSubmit = () => {
        const inputRows = rowsRef?.current || [];
        if(!checkInputRows(inputRows)) {
            toast('Please log all students');
            return;
        }
    }
    
    
    return <>
        <div className={cx(styles.boardControl)}>
            <span className={cx(styles.selectLabel)}>Event:</span>
            <TableSelect
                options={USER_TYPE_OPTIONS}
                className={cx(styles.select)}
                height={25}
                selected={event}
                warn={false}
                onChange={setEvent}
            />
        </div>
        <div className={styles.table}>
            <Table
                rowNumber={200}
                columns={LOG_ATTENDANCE_COLUMNS}
                rows={rows}
            />
        </div>
        <div className={cx(styles.submitContainer)}><TableButton onClick={onSubmit} label={'Submit'} className={cx(styles.submit)}/></div>
    </>
}