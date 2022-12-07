import styles from './index.module.css';
import classNames from 'classnames/bind';
import Papa from "papaparse";
import { BUTTONS, RESPONSE_STATUS, TABLE, WINDOW_TYPE } from '../../lib/constants';
import { TableButton } from '../../components/TableButton';
import { Table } from '../../components/Table';
import { useEffect, useRef, useState } from 'react';
import { PopUpEditUser } from '../../components/PopUpEditUser';
import { PopUpDeleteRow } from '../../components/PopUpDeleteRow';
import { PopUpDeleteAll } from '../../components/PopUpDeleteAll';
import { getOptionValue, getSortParam, importUsersToJSON, toUpperRows, updateOrder } from '../../lib/util';
import { PopUpAddUser } from '../../components/PopUpAddUser';
import { BlockBlocker } from '../../components/BlockBlocker';
import { TableItem } from '../../components/TableItem';
import { useAuth, useAuthenticatedRequest, useWindowSize } from '../../lib/hooks';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

// User management page
export const UserManagement = () => {
    const { token } = useAuth();
    const { get, post } = useAuthenticatedRequest();
    const isMobile = useWindowSize().type === WINDOW_TYPE.MOBILE;
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
    const [typeFilter, setTypeFilter] = useState([]);
    const [statusFilter, setStatusFilter] = useState([]);
    const [visionsFilter, setVisionsFilter] = useState([]);
    const [visionOptions, setVisionOptions] = useState([]);
    const uploadRef = useRef();
    const orderRef = useRef([]);

    // obtain user records and all vision numbers
    const getUser = () => {
        get({
            url: '/visionsNums',
            onResolve: res => {
                const { status, result } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    const { list } = result;
                    setVisionOptions(list.filter(val => val?.visions !== null).map(option => option.visions.toString()));
                }
                else toast('Error fetching visions options');
            },
            onReject: () => toast('Error fetching visions options')
        });
        get({
            url: '/readUser',
            params: { 
                row_start: tablePage * TABLE.ROW_PER_PAGE, 
                row_num: TABLE.ROW_PER_PAGE,
                ...(nameSearch && { name_search: JSON.stringify([nameSearch]) }),
                ...(nameSort && { name_sort: nameSort }),
                ...(emailSearch && { email_search: JSON.stringify([emailSearch]) }),
                ...(emailSort && { email_sort: emailSort }),
                ...(typeFilter.length > 0 && { type_filter: JSON.stringify(typeFilter) }),
                ...(statusFilter.length > 0 && { status_filter: JSON.stringify(statusFilter) }),
                ...(visionsFilter.length > 0 && { visions_filter: JSON.stringify(visionsFilter) }),
                ...(orderRef.current.length > 0 && { condition_order: JSON.stringify(orderRef.current) }),
            },
            onResolve: res => {
                const { status, result: { rows = [], pages = 1 } } = res;
                setDisableTable(false);
                if(status === RESPONSE_STATUS.SUCCESS) {
                    setRows(toUpperRows(rows));
                    setTotalPage(parseInt(pages));
                }
                else toast('Internal error');
            },
            onReject: () => {
                setDisableTable(false);
                toast('Internal error');
            }
        });
    }

    // update user records and vision numbers every time query conditions change
    useEffect(() => {
        setDisableTable(true);
        getUser();
    }, [tablePage, nameSearch, nameSort, emailSearch, emailSort, typeFilter, statusFilter, visionsFilter, token]);

    // for importing file
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
                    post({
                        url: '/userLoadfromcsv',
                        params: { file: inputObj },
                        onResolve: res => {
                            const { status } = res;
                            if(status === RESPONSE_STATUS.SUCCESS) getUser();
                            else if(status === RESPONSE_STATUS.EMAIL_USED) {
                                toast('There were repeated emails. Only users with valid email were imported');
                                getUser();
                            }
                            else toast('Internal error');
                            setDisableTable(false);
                        },
                        onReject: () => {
                            setDisableTable(false);
                            toast('Internal error');
                        }
                    });
                    setImportFile(null);
                },
                error: err => setImportFile(null)});
            if(uploadRef?.current?.value) uploadRef.current.value = '';
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
        post({
            url: '/deleteUser',
            params: { email: row?.email || "" },
            onResolve: res => {
                setShowDeletePopUp(false);
                const { status } = res;
                if(status === RESPONSE_STATUS.SUCCESS) getUser();
                else if(status === RESPONSE_STATUS.INCORRECT_USER_EMAIL) toast('Email is not found');
                else toast('Internal error');
            },
            onReject: () => toast('Internal error')
        });
    }

    const onConfirmClear = () => {
        post({
            url: '/resetUsers',
            onResolve: res => {
                const { status } = res;
                setShowDeleteAllPopUp(false);
                if(status === RESPONSE_STATUS.SUCCESS) getUser();
                else toast('Error resetting system');
            }
        });
    }

    const onSaveEdit = ({ inputName, inputEmail, inputType, inputVisions, oldEmail }) => {
        post({
            url: '/updateUser',
            params: { old_email: oldEmail, name: inputName, email: inputEmail, type: inputType, visions: inputVisions },
            onResolve: res => {
                const { status } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    setShowEditPopUp(false);
                    getUser();
                }
                else if(status === RESPONSE_STATUS.INCORRECT_USER_EMAIL) toast('Email is incorrect');
                else toast('Internal error');
            },
            onReject: () => toast('Internal error')
        });
    }

    const onAddUser = ({ inputName, inputEmail, inputType, inputVisions }) => {
        post({
            url: '/createUser',
            params: { name: inputName, email: inputEmail, type: inputType, visions: inputVisions },
            onResolve: res => {
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
            },
            onReject: () => toast('Internal error')
        });
    }   

    const onPageChange = (curPage) => {
        setTablePage(curPage - 1);
    }

    // columns for the Table component
    const columns = [
        {
            key: 'name',
            label: 'Name',
            search: (value) => {
                setTablePage(0);
                setNameSearch(value);
            },
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
            search: (value) => {
                setTablePage(0);
                setEmailSearch(value);
            },
            render: (val) => <TableItem item={val} />
        },
        {
            key: 'type',
            label: 'Type',
            filter: {
                callback: (value) => {
                    setTablePage(0);
                    setTypeFilter(getOptionValue(value));
                },
                options: ['VUCeptor', 'Adviser', 'Board']
            },
            render: (val) => <TableItem item={val} />
        },
        {
            key: 'visions',
            label: 'Visions',
            filter: {
                callback: (value) => {
                    setTablePage(0);
                    setVisionsFilter(getOptionValue(value));
                },
                options: visionOptions,
            },
            render: (val) => <TableItem item={val} />
        },
        {
            key: 'status',
            label: 'Status',
            filter: {
                callback: (value) => {
                    setTablePage(0);
                    setStatusFilter(getOptionValue(value));
                },
                options: ['Registered', 'Unregistered']
            },
            render: (val) => <TableItem item={val} />
        },
    ];

    return <>
        <BlockBlocker show={disableTable}/>
        <div className={cx(styles.boardControl, {[styles.mobile]: isMobile})}>
            <TableButton className={cx(styles.tableButton, {[styles.mobile]: isMobile})} label={isMobile ? '+ New' : BUTTONS.NEW_USER} onClick={() => setShowAddPopUp(true)}/>
            <TableButton className={cx(styles.tableButton, {[styles.mobile]: isMobile})} label={BUTTONS.IMPORT} onClick={onImport}/>
            <TableButton className={cx(styles.tableButton, {[styles.mobile]: isMobile})} label={BUTTONS.RESET} onClick={() => setShowDeleteAllPopUp(true)}/>
        </div>
        <div className={styles.table}>
            <Table
                tablePage={tablePage + 1}
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