import styles from './index.module.css';
import classNames from 'classnames/bind';
import { BUTTONS, FIRST_YEAR_COLUMNS, FIRST_YEAR_ROWS_TEST, USER_TYPE_OPTIONS, WINDOW_TYPE } from '../../lib/constants';
import { TableButton } from '../../components/TableButton';
import { Table } from '../../components/Table';
import { useState } from 'react';
import { PopUpDeleteRow } from '../../components/PopUpDeleteRow';
import { PopUpEditRecord } from '../../components/PopUpEditRecord';
import { TableSelect } from '../../components/TableSelect';
import { useWindowSize } from '../../lib/hooks';
const cx = classNames.bind(styles);

export const VUceptorAttendance = () => {
    const { width, type } = useWindowSize();
    const isMobile = type === WINDOW_TYPE.MOBILE;
    const isSmall = width < 840 || isMobile
    const [showDeletePopUp, setShowDeletePopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);
    const [deleteRow, setDeleteRow] = useState(null);
    const [editRow, setEditRow] = useState(null);
    const [timeRange, setTimeRange] = useState(null);

    const onEditRow = (row) => {
        setShowEditPopUp(true);
        setEditRow(row);
    }

    const onDeleteRow = (row) => {
        setShowDeletePopUp(true);
        setDeleteRow(row);
    }

    const onConfirmDelete = () => {
        
    }

    const onSaveEdit = () => {

    }
    
    return <>
        <div className={cx(styles.boardControl)}>
            <div className={cx(styles.selectContainer, {[styles.small]: isSmall})}>
                <span className={cx(styles.selectLabel, {[styles.small]: isSmall})}>Time Range:</span>
                <TableSelect
                    options={USER_TYPE_OPTIONS}
                    className={cx(styles.select)}
                    height={25}
                    selected={timeRange}
                    warn={false}
                    onChange={setTimeRange}
                />
            </div>
            <div className={cx(styles.selectContainer, {[styles.small]: isSmall})}>
                <span className={cx(styles.selectLabel, {[styles.small]: isSmall})}>Absences:</span>
                <TableSelect
                    options={USER_TYPE_OPTIONS}
                    className={cx(styles.select)}
                    height={25}
                    selected={timeRange}
                    warn={false}
                    onChange={setTimeRange}
                />
            </div>
            <TableButton className={cx(styles.tableButton)} label={BUTTONS.EXPORT}/>
        </div>
        <div className={styles.table}>
            <Table
                rowNumber={200}
                columns={FIRST_YEAR_COLUMNS}
                rawRows={FIRST_YEAR_ROWS_TEST}
                onDeleteRow={onDeleteRow}
                onEditRow={onEditRow}
                rows={FIRST_YEAR_ROWS_TEST}
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