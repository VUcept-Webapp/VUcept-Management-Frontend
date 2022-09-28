import styles from './index.module.css';
import classNames from 'classnames/bind';
import { BUTTONS, USER_MANAGEMENT_COLUMNS, USER_MANAGEMENT_ROWS_TEST } from '../../lib/constants';
import { TableButton } from '../../components/TableButton';
import { Table } from '../../components/Table';
import { useRef } from 'react';
import { TableItem } from '../../components/TableItem';
const cx = classNames.bind(styles);

const constructRows = (rows) => {
    return rows.map(row => row.map((item, i) => <TableItem item={item}/>));
}

export const FirstYear = () => {
    const controlRef = useRef();
    const tableContainerRef = useRef();


    return <>
        <div className={cx(styles.boardControl)} ref={controlRef}>
            <TableButton className={cx(styles.tableButton)} label={BUTTONS.NEW_USER}/>
            <TableButton className={cx(styles.tableButton)} label={BUTTONS.IMPORT}/>
        </div>
        <div className={styles.table} ref={tableContainerRef}>
            <Table
                rowNumber={200}
                columns={USER_MANAGEMENT_COLUMNS}
                rows={constructRows(USER_MANAGEMENT_ROWS_TEST)}
            />
        </div>
    </>
}