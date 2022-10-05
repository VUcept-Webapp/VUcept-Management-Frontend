import styles from './index.module.css';
import classNames from 'classnames/bind';
import Papa from "papaparse";
import { BUTTONS, RESPONSE_MESSAGE, RESPONSE_STATUS, TABLE, USER_MANAGEMENT_COLUMNS, USER_MANAGEMENT_ROWS_TEST, WINDOW_TYPE } from '../../lib/constants';
import { TableButton } from '../../components/TableButton';
import { Table } from '../../components/Table';
import { useEffect, useRef, useState } from 'react';
import { PopUpEditUser } from '../../components/PopUpEditUser';
import { PopUpDeleteRow } from '../../components/PopUpDeleteRow';
import { createUser, deleteUser, updateUser, userLoadfromcsv, readUser } from '../../lib/services';
import { importUsersToJSON, toUpperRows } from '../../lib/util';
import { PopUpAddUser } from '../../components/PopUpAddUser';
const cx = classNames.bind(styles);

export const UserManagement = ({ toast }) => {
    const [rows, setRows] = useState([]);
    const [showDeletePopUp, setShowDeletePopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);
    const [showAddPopUp, setShowAddPopUp] = useState(false);
    const [deleteRow, setDeleteRow] = useState(null);
    const [editRow, setEditRow] = useState(null);
    const [importFile, setImportFile] = useState(null);
    const [tablePage, setTablePage] = useState(0);
    const uploadRef = useRef();

    const getUser = () => {
        return readUser({ row_start: tablePage * TABLE.ROW_PER_PAGE, row_num: TABLE.ROW_PER_PAGE })
            .then(res => {
                const { status, message: data } = res;
                if(status === RESPONSE_STATUS.SUCCESS) setRows(toUpperRows(data));
                else toast('Internal error');
            })
            .catch(err => toast('Internal error'));
    }

    useEffect(() => {
        getUser();
    }, [tablePage]);

    useEffect(() => {
        if(importFile) {
            Papa.parse(importFile, {
                complete: res => {
                    const { data } = res;
                    const inputObj = importUsersToJSON(data);
                    if(inputObj === 'error') {
                        toast('Please provide a valid csv file');
                        setImportFile(null);
                        return;
                    }
                    userLoadfromcsv({ file: inputObj })
                        .then(res => {
                            const { status } = res;
                            if(status === RESPONSE_STATUS.SUCCESS) getUser();
                            else if(status === RESPONSE_STATUS.EMAIL_USED) toast('Repeated email');
                            else toast('Internal error');
                        })
                        .catch(err => toast('Internal error'));
                    setImportFile(null);
                },
                error: err => {
                    console.log(err);
                }
            })
        }
    }, [importFile]);

    const onImport = () => {
        uploadRef?.current?.click();
    }

    const onDeleteRow = (row) => {
        setShowDeletePopUp(true);
        setDeleteRow(row);
    }

    const onEditRow = (row) => {
        setShowEditPopUp(true);
        setEditRow(row);
    }

    const onConfirmDelete = (row) => {
        deleteUser({ email: row?.email || "" })
            .then(res => {
                setShowDeletePopUp(false);
                const { status } = res;
                if(status === RESPONSE_STATUS.SUCCESS) getUser();
                else if(status === RESPONSE_STATUS.INCORRECT_USER_EMAIL) toast('Email is not found');
                else  toast('Internal error');
            })
            .catch(err => toast('Internal error'));
    }

    const onSaveEdit = ({ inputName, inputEmail, inputType, inputVisions, inputStatus, oldEmail }) => {
        updateUser({ old_email: oldEmail, name: inputName, email: inputEmail, type: inputType, visions: inputVisions, status: inputStatus  })
            .then(res => {
                const { status } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    setShowEditPopUp(false);
                    getUser();
                }
                else if(status === RESPONSE_STATUS.INCORRECT_USER_EMAIL) toast('Email is incorrect');
                else toast('Internal error');
            })
            .catch(err => toast('Internal error'));
    }

    const onAddUser = ({ inputName, inputEmail, inputType, inputVisions }) => {
        createUser({ name: inputName, email: inputEmail, type: inputType, visions: inputVisions })
            .then(res => {
                setShowAddPopUp(false);
                const { status } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    setShowAddPopUp(false);
                    getUser();
                }
                else if(status === RESPONSE_STATUS.EMAIL_USED) toast('Email taken. Please provide another email');
                else {
                    toast('Internal error');
                    setShowAddPopUp(false);
                }
            })
            .catch(err => toast('Internal error'));
    }   

    const onPageChange = (curPage) => {
        setTablePage(curPage - 1);
    }

    return <>
        <div className={cx(styles.boardControl)}>
            <TableButton className={cx(styles.tableButton)} label={BUTTONS.NEW_USER} onClick={() => setShowAddPopUp(true)}/>
            <TableButton className={cx(styles.tableButton)} label={BUTTONS.IMPORT} onClick={onImport}/>
        </div>
        <div className={styles.table}>
            <Table
                rowNumber={200}
                columns={USER_MANAGEMENT_COLUMNS}
                onEditRow={onEditRow}
                onDeleteRow={onDeleteRow}
                rows={rows}
                onPageChange={onPageChange}
            />
        </div>
        {showDeletePopUp && <PopUpDeleteRow
            show={showDeletePopUp}
            setShow={setShowDeletePopUp}
            title={'Remove User'}
            description={'Confirm to remove user'}
            row={deleteRow}
            onDelete={onConfirmDelete}
        />}
        {showEditPopUp && <PopUpEditUser 
            row={editRow}
            title={'Edit User'}
            show={showEditPopUp} 
            setShow={setShowEditPopUp}
            onSave={onSaveEdit}
            oldEmail={editRow?.email}
        />}
        {showAddPopUp && <PopUpAddUser 
            title={'Add User'}
            show={showAddPopUp} 
            setShow={setShowAddPopUp}
            onAdd={onAddUser}
        />}
        <input
           type="file"
           accept='.csv'
           ref={uploadRef}
           style={{ display: 'none' }}
           onChange={(e) => setImportFile(e.target.files[0])}
        />
    </>
}