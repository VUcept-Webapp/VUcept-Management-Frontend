import styles from './index.module.css';
import classNames from 'classnames/bind';
import { LOG_ATTENDANCE_COLUMNS, LOG_ATTENDANCE_ROWS_TEST, USER_TYPE_OPTIONS } from '../../lib/constants';
import { Table } from '../../components/Table';
import { useState } from 'react';
import { TableSelect } from '../../components/TableSelect';
const cx = classNames.bind(styles);

export const LogAttendance = () => {
    const [event, setEvent] = useState(null);
    const [rows, setRows] = useState(LOG_ATTENDANCE_ROWS_TEST);
    
    
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
    </>
}