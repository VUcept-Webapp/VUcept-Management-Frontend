import styles from './index.module.css';
import classNames from 'classnames/bind';
import Papa from "papaparse";
import { BUTTONS, RESPONSE_MESSAGE, USER_MANAGEMENT_COLUMNS, USER_MANAGEMENT_ROWS_TEST, WINDOW_TYPE } from '../../lib/constants';
import { TableButton } from '../../components/TableButton';
import { Table } from '../../components/Table';
import { useEffect, useRef, useState } from 'react';
import { PopUpEditUser } from '../../components/PopUpEditUser';
import { PopUpDeleteRow } from '../../components/PopUpDeleteRow';
import { addUser, deleteUser, editUser, loadFromCsv, viewAllUsers } from '../../lib/services';
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
    const uploadRef = useRef();

    useEffect(() => {
        viewAllUsers()
            .then(res => {
                const { message, data } = res;
                if(message === RESPONSE_MESSAGE.VIEW_USER_SUCCESS) setRows(toUpperRows(data));
                else toast('Internal error');
            })
            .catch(err => toast('Internal error'));
    }, []);

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
                    loadFromCsv({ file: inputObj })
                        .then(res => {
                            console.log(res)
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
                const { message } = res;
                if(message === RESPONSE_MESSAGE.USER_DELETE_SUCCESS) {
                    viewAllUsers()
                        .then(res => {
                            console.log('view', res);
                            const { message, data } = res;
                            if(message === RESPONSE_MESSAGE.VIEW_USER_SUCCESS) setRows(toUpperRows(data));
                            else toast('Internal error');
                        })
                        .catch(err => toast('Internal error'));
                }
            })
            .catch(err => toast('Internal error'));
    }

    const onSaveEdit = ({ inputName, inputEmail, inputType, visions }) => {
        editUser({ name: inputName, email: inputEmail, type: inputType, visions })
            .then(res => {
                setShowEditPopUp(false);
                const { message } = res;
                if(message === RESPONSE_MESSAGE.USER_EDIT_SUCCESS) {
                    viewAllUsers()
                        .then(res => {
                            const { message, data } = res;
                            if(message === RESPONSE_MESSAGE.VIEW_USER_SUCCESS) setRows(toUpperRows(data));
                            else toast('Internal error');
                        })
                        .catch(err => toast('Internal error'));
                }
            })
            .catch(err => console.log('err', err));
    }

    const onAddUser = ({ inputName, inputEmail, inputType }) => {
        addUser({ name: inputName, email: inputEmail, type: inputType, visions: "" })
            .then(res => {
                setShowAddPopUp(false);
                const { message } = res;
                if(message === RESPONSE_MESSAGE.ADD_USER_SUCCESS) {
                    viewAllUsers()
                        .then(res => {
                            const { message, data } = res;
                            if(message === RESPONSE_MESSAGE.VIEW_USER_SUCCESS) setRows(toUpperRows(data));
                            else toast('Internal error');
                        })
                        .catch(err => toast('Internal error'));
                }
            })
            .catch(err => toast('Internal error'));
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