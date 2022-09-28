import styles from './index.module.css';
import classNames from 'classnames/bind';
import { BUTTONS, USER_MANAGEMENT_COLUMNS, USER_MANAGEMENT_ROWS_TEST, WINDOW_TYPE } from '../../lib/constants';
import { TableButton } from '../../components/TableButton';
import { Table } from '../../components/Table';
import { useState } from 'react';
import { TableItem } from '../../components/TableItem';
import { useWindowSize } from '../../lib/hooks';
import { PopUpEditUser } from '../../components/PopUpEditUser';
import { PopUpDeleteRow } from '../../components/PopUpDeleteRow';
const cx = classNames.bind(styles);

const constructRows = (rows) => {
    return rows.map(row => row.map((item, i) => <TableItem item={item}/>));
}

export const UserManagement = () => {
    const { width, type } = useWindowSize();
    const isMobile = type === WINDOW_TYPE.MOBILE;
    const isSmall = isMobile || width < 750;
    const [showDeletePopUp, setShowDeletePopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);
    const [showAddPopUp, setShowAddPopUp] = useState(false);
    const [deleteRow, setDeleteRow] = useState(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editType, setEditType] = useState("");

    const onDeleteRow = (row) => {
        setShowDeletePopUp(true);
        setDeleteRow(row);
    }

    const onEditRow = (row) => {
        setEditName(row[0]);
        setEditEmail(row[1]);
        setEditType(row[2]);
        setShowEditPopUp(true);
    }

    const onConfirmDelete = () => {
        
    }

    const onSaveEdit = () => {

    }

    const onAddUser = () => {
        
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
                rawRows={USER_MANAGEMENT_ROWS_TEST}
                rows={constructRows(USER_MANAGEMENT_ROWS_TEST)}
            />
        </div>
        <PopUpDeleteRow
            show={showDeletePopUp}
            setShow={setShowDeletePopUp}
            title={'Remove User'}
            description={'Confirm to remove user'}
            content={deleteRow?.length ? deleteRow[0] : ""}
            onDelete={onConfirmDelete}
        />
        <PopUpEditUser 
            title={'Edit User'}
            show={showEditPopUp} 
            setShow={setShowEditPopUp}
            name={editName}
            email={editEmail}
            type={editType}
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