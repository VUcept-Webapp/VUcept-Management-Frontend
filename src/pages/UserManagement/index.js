import styles from './index.module.css';
import classNames from 'classnames/bind';
import { BUTTONS, USER_MANAGEMENT_COLUMNS, USER_MANAGEMENT_ROWS_TEST, WINDOW_TYPE } from '../../lib/constants';
import { TableButton } from '../../components/TableButton';
import { Table } from '../../components/Table';
import { useEffect, useState } from 'react';
import { PopUpEditUser } from '../../components/PopUpEditUser';
import { PopUpDeleteRow } from '../../components/PopUpDeleteRow';
import { viewAllUsers } from '../../lib/services';
const cx = classNames.bind(styles);

export const UserManagement = () => {
    const [rows, setRows] = useState([]);
    const [showDeletePopUp, setShowDeletePopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);
    const [showAddPopUp, setShowAddPopUp] = useState(false);
    const [deleteRow, setDeleteRow] = useState(null);
    const [editRow, setEditRow] = useState(null);

    useEffect(() => {
        viewAllUsers()
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }, []);

    const onDeleteRow = (row) => {
        setShowDeletePopUp(true);
        setDeleteRow(row);
    }

    const onEditRow = (row) => {
        setShowEditPopUp(true);
        setEditRow(row);
    }

    const onConfirmDelete = () => {

    }

    const onSaveEdit = ({ inputName, inputEmail, inputType }) => {
    }

    const onAddUser = ({ inputName, inputEmail, inputType }) => {
    }

    return <>
        <div className={cx(styles.boardControl)}>
            <TableButton className={cx(styles.tableButton)} label={BUTTONS.NEW_USER} onClick={() => setShowAddPopUp(true)}/>
            <TableButton className={cx(styles.tableButton)} label={BUTTONS.IMPORT}/>
        </div>
        <div className={styles.table}>
            <Table
                rowNumber={200}
                columns={USER_MANAGEMENT_COLUMNS}
                onEditRow={onEditRow}
                onDeleteRow={onDeleteRow}
                rows={USER_MANAGEMENT_ROWS_TEST}
            />
        </div>
        <PopUpDeleteRow
            show={showDeletePopUp}
            setShow={setShowDeletePopUp}
            title={'Remove User'}
            description={'Confirm to remove user'}
            row={deleteRow}
            onDelete={onConfirmDelete}
        />
        <PopUpEditUser 
            row={editRow}
            title={'Edit User'}
            show={showEditPopUp} 
            setShow={setShowEditPopUp}
            onSave={onSaveEdit}
        />
        <PopUpEditUser 
            title={'Add User'}
            show={showAddPopUp} 
            setShow={setShowAddPopUp}
            onSave={onAddUser}
        />
    </>
}