import styles from './index.module.css';
import classNames from 'classnames/bind';
import Papa from "papaparse";
import { BUTTONS, RESPONSE_STATUS, SORT, TABLE } from '../../lib/constants';
import { TableButton } from '../../components/TableButton';
import { Table } from '../../components/Table';
import { useEffect, useRef, useState } from 'react';
import { PopUpEditUser } from '../../components/PopUpEditUser';
import { PopUpDeleteRow } from '../../components/PopUpDeleteRow';
import { PopUpDeleteAll } from '../../components/PopUpDeleteAll';
import { createUser, deleteUser, updateUser, userLoadfromcsv, readUser, resetDatabase, visionsNums } from '../../lib/services';
import { getOptionValue, getSortParam, importUsersToJSON, toUpperRows, updateOrder } from '../../lib/util';
import { PopUpAddUser } from '../../components/PopUpAddUser';
import { BlockBlocker } from '../../components/BlockBlocker';
import { TableItem } from '../../components/TableItem';
const cx = classNames.bind(styles);

export const VisionsAssignment = ({ toast }) => {
    const [rows, setRows] = useState([]);
    const [showDeletePopUp, setShowDeletePopUp] = useState(false);
    const [showDeleteAllPopUp, setShowDeleteAllPopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);
    const [showAddPopUp, setShowAddPopUp] = useState(false);
    const [deleteRow, setDeleteRow] = useState(null);
    const [editRow, setEditRow] = useState(null);
    const [importFile, setImportFile] = useState(null);
    const [tablePage, setTablePage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [disableTable, setDisableTable] = useState(false);
    const [nameSort, setNameSort] = useState(null);
    const [nameSearch, setNameSearch] = useState("");
    const [emailSort, setEmailSort] = useState(null);
    const [emailSearch, setEmailSearch] = useState("");
    const [visionsFilter, setVisionsFilter] = useState([]);
    const [visionOptions, setVisionOptions] = useState([]);
    const [vuceptorFilter, setVuceptorFilter] = useState([]);
    const [vuceptorSearch, setVuceptorSearch] = useState("");
    const uploadRef = useRef();
    const orderRef = useRef([]);


    const getUser = () => {
        visionsNums().then(res => {
            const { status, result } = res;
            if(status === RESPONSE_STATUS.SUCCESS) {
                const { list } = result;
                setVisionOptions(list.map(option => option.visions.toString()));
            }
            else toast('Error fetching visions options');
        }).catch(err => toast('Error fetching visions options'));
    }

    useEffect(() => {
        // setDisableTable(true);
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
                    setDisableTable(true);
                    userLoadfromcsv({ file: inputObj })
                        .then(res => {
                            const { status } = res;
                            if(status === RESPONSE_STATUS.SUCCESS) getUser();
                            else if(status === RESPONSE_STATUS.EMAIL_USED) {
                                toast('There were repeated emails. Only users with valid email were imported');
                                getUser();
                            }
                            else toast('Internal error');
                            setDisableTable(false);
                        })
                        .catch(err => {
                            setDisableTable(false);
                            toast('Internal error');
                        });
                    setImportFile(null);
                },
                error: err => setImportFile(null)});
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
                else toast('Internal error');
            })
            .catch(err => toast('Internal error'));
    }

    const onConfirmClear = () => {
        resetDatabase()
            .then(res => {
                const { status } = res;
                setShowDeleteAllPopUp(false);
                if(status === RESPONSE_STATUS.SUCCESS) getUser();
                else toast('Error resetting system');
            })
    }

    const onSaveEdit = ({ inputName, inputEmail, inputType, inputVisions, oldEmail }) => {
        updateUser({ old_email: oldEmail, name: inputName, email: inputEmail, type: inputType, visions: inputVisions })
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

    const columns = [
        {
            key: 'name',
            label: 'First-year Name',
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
                options: visionOptions,
            },
            render: (val) => <TableItem item={val} />
        },
        {
            key: 'vuceptor',
            label: 'VUceptor',
            filter: {
                callback: (value) => setVuceptorFilter(getOptionValue(value)),
                options: ['Registered', 'Unregistered']
            },
            search: (value) => setVuceptorSearch(value),
            render: (val) => <TableItem item={val} />
        },
    ];

    return <>
        <BlockBlocker show={disableTable}/>
        <div className={cx(styles.boardControl)}>
            <TableButton className={cx(styles.tableButton)} label={BUTTONS.NEW_FIRST_YEAR} onClick={() => setShowAddPopUp(true)}/>
            <TableButton className={cx(styles.tableButton)} label={BUTTONS.IMPORT} onClick={onImport}/>
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
        {showDeleteAllPopUp && <PopUpDeleteAll
            show={showDeleteAllPopUp}
            setShow={setShowDeleteAllPopUp}
            title={'Clear'}
            description={'Are you sure you want to clear the whole system?'}
            onDelete={onConfirmClear}
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