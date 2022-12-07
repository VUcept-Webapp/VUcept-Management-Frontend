import styles from './index.module.css';
import classNames from 'classnames/bind';
import Papa from "papaparse";
import { BUTTONS, RESPONSE_STATUS, TABLE, USER_TYPE } from '../../lib/constants';
import { TableButton } from '../../components/TableButton';
import { Table } from '../../components/Table';
import { useEffect, useRef, useState } from 'react';
import { PopUpDeleteRow } from '../../components/PopUpDeleteRow';
import { PopUpDeleteAll } from '../../components/PopUpDeleteAll';
import { getOptionValue, getSortParam, importUsersToJSON, toUpperRows, updateOrder } from '../../lib/util';
import { BlockBlocker } from '../../components/BlockBlocker';
import { TableItem } from '../../components/TableItem';
import { PopUpAddFy } from '../../components/PopUpAddFy';
import { PopUpEditFy } from '../../components/PopUpEditFy';
import { useAuth, useAuthenticatedRequest, useWindowSize } from '../../lib/hooks';
const cx = classNames.bind(styles);

// Visions assignment page
export const VisionsAssignment = ({ toast }) => {
    const isMobile = useWindowSize().type;
    const { auth, token } = useAuth();
    const { get, post } = useAuthenticatedRequest();
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
    const [vuceptorOptions, setVuceptorOptions] = useState([]);
    const uploadRef = useRef();
    const orderRef = useRef([]);

    const getFy = () => {
        get({
            url: '/fyVisionsNums',
            onResolve: res => {
                const { status, result } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    const { list } = result;
                    setVisionOptions(list.map(option => option.visions?.toString()));
                }
                else toast('Error fetching visions options');
            },
            onReject: () => toast('Error fetching visions options')
        })
        get({
            url: '/vuceptorList',
            onResolve: res => {
                const { status, result } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    const { list } = result;
                    setVuceptorOptions(list.map(option => option.name?.toString()));
                }
                else toast('Error fetching VUceptor options');
            },
            onReject: () => toast('Error fetching VUceptor options')
        });
        setDisableTable(true);
        get({
            url: '/readFy',
            params: {
                row_start: tablePage * TABLE.ROW_PER_PAGE, 
                row_num: TABLE.ROW_PER_PAGE,
                ...(nameSearch && { name_search: JSON.stringify([nameSearch]) }),
                ...(nameSort && { name_sort: nameSort }),
                ...(emailSearch && { email_search: JSON.stringify([emailSearch]) }),
                ...(emailSort && { email_sort: emailSort }),
                ...(visionsFilter.length > 0 && { visions_filter: JSON.stringify(visionsFilter) }),
                ...(vuceptorFilter.length > 0 && { vuceptor_filter: JSON.stringify(vuceptorFilter) }),
                ...(vuceptorSearch && { vuceptor_search: JSON.stringify([vuceptorSearch]) }),
                ...(orderRef.current.length > 0 && { condition_order: JSON.stringify(orderRef.current) }),
            },
            onResolve: res => {
                const { status, result: { rows = [], pages = 1 } } = res;
                setDisableTable(false);
                if(status === RESPONSE_STATUS.SUCCESS) {
                    setRows(toUpperRows(rows));
                    setTotalPage(parseInt(pages));
                }
                else if(status === RESPONSE_STATUS.INCORRECT_FY_NAME) toast('Incorrect search for First-year name');
                else if(status === RESPONSE_STATUS.INCORRECT_FY_EMAIL) toast('Incorrect search for Email');
                else if(status === RESPONSE_STATUS.INCORRECT_FY_VISIONS) toast('Incorrect filter for Visions');
                else toast('Internal error');
            },
            onReject: () => {
                setDisableTable(false);
                toast('Internal error');
            }
        });
    }

    useEffect(() => {
        if(auth?.type === USER_TYPE.VUCEPTOR) setVisionsFilter([auth?.visions]);
    }, [auth]);

    useEffect(() => {
        getFy();
    }, [tablePage, nameSearch, nameSort, emailSearch, emailSort, visionsFilter, vuceptorFilter, vuceptorSearch, token]);

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
                        url: '/fyLoadfromcsv',
                        params: { file: inputObj },
                        onResolve: res => {
                            const { status } = res;
                            if(status === RESPONSE_STATUS.SUCCESS) getFy();
                            else if(status === RESPONSE_STATUS.EMAIL_USED) {
                                toast('There were repeated emails. Only users with valid email were imported');
                                getFy();
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
            url: '/deleteFy',
            params: { email: row?.fy_email || "" },
            onResolve: res => {
                setShowDeletePopUp(false);
                const { status } = res;
                if(status === RESPONSE_STATUS.SUCCESS) getFy();
                else if(status === RESPONSE_STATUS.INCORRECT_USER_EMAIL) toast('Email is not found');
                else toast('Internal error');
            },
            onReject: () => toast('Internal error')
        });
    }

    const onConfirmClear = () => {
        post({
            url: '/resetFy',
            onResolve: res => {
                const { status } = res;
                setShowDeleteAllPopUp(false);
                if(status === RESPONSE_STATUS.SUCCESS) getFy();
                else toast('Error resetting system');
            }
        });
    }

    const onSaveEdit = ({ inputName, inputEmail, inputVisions, oldEmail }) => {
        post({
            url: '/updateFy',
            params: { old_email: oldEmail, name: inputName, email: inputEmail, visions: inputVisions },
            onResolve: res => {
                const { status } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    setShowEditPopUp(false);
                    getFy();
                }
                else if(status === RESPONSE_STATUS.EMAIL_USED) toast('Email is used');
                else if(status === RESPONSE_STATUS.INCORRECT_FY_VISIONS) toast('Incorrect vision group');
                else toast('Internal error');
            },
            onReject: () => toast('Internal error')
        });
    }

    const onAddFy = ({ inputName, inputEmail, inputVisions }) => {
        post({
            url: '/createFy',
            params: { name: inputName, email: inputEmail, visions: inputVisions },
            onResolve: res => {
                const { status } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    setShowAddPopUp(false);
                    getFy();
                }
                else if(status === RESPONSE_STATUS.EMAIL_USED) toast('Email taken. Please provide another email');
                else if(status === RESPONSE_STATUS.INCORRECT_FY_VISIONS) toast('Incorrect vision group');
                else {
                    toast('Internal error');
                    setShowAddPopUp(false);
                }
            },
            onReject: () => toast('Internal error')
        })
    }   

    const onPageChange = (curPage) => {
        setTablePage(curPage - 1);
    }

    const columns = [
        {
            key: 'fy_name',
            label: 'First-year Name',
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
            key: 'fy_email',
            label: 'Email',
            sort: (value) => {
                updateOrder({ order: orderRef.current, value, key: 'email_sort' });
                setEmailSort(getSortParam(value));
            },
            search: (value) => {
                setEmailSearch(value);
                setTablePage(0);
            },
            render: (val) => <TableItem item={val} />
        },
        {
            key: 'visions',
            label: 'Visions',
            ...(auth?.type !== USER_TYPE.VUCEPTOR && { filter: {
                callback: (value) => {
                    setTablePage(0);
                    setVisionsFilter(getOptionValue(value));
                },
                options: visionOptions,
            }}),
            render: (val) => <TableItem item={val} />
        },
        {
            key: 'vuceptor_name',
            label: 'VUceptor',
            filter: {
                callback: (value) => {
                    setTablePage(0);
                    setVuceptorFilter(getOptionValue(value));
                },
                options: vuceptorOptions
            },
            search: (value) => {
                setTablePage(0);
                setVuceptorSearch(value);
            },
            render: (val) => <TableItem item={val} />
        },
    ];

    return <>
        <BlockBlocker show={disableTable}/>
        <div className={cx(styles.boardControl)}>
            <TableButton className={cx(styles.tableButton)} label={isMobile ? 'New' : BUTTONS.NEW_FIRST_YEAR} onClick={() => setShowAddPopUp(true)}/>
            <TableButton className={cx(styles.tableButton)} label={BUTTONS.IMPORT} onClick={onImport}/>
            <TableButton className={cx(styles.tableButton)} label={BUTTONS.RESET} onClick={() => setShowDeleteAllPopUp(true)}/>
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
            title={'Remove First year'}
            description={'Confirm to remove First-year student'}
            row={deleteRow}
            onDelete={onConfirmDelete}
        />}
        {showEditPopUp && <PopUpEditFy 
            row={editRow}
            title={'Edit First-year'}
            show={showEditPopUp} 
            setShow={setShowEditPopUp}
            onSave={onSaveEdit}
            oldEmail={editRow?.fy_email}
        />}
        {showAddPopUp && <PopUpAddFy 
            title={'Add First-year'}
            show={showAddPopUp} 
            setShow={setShowAddPopUp}
            onAdd={onAddFy}
        />}
        {showDeleteAllPopUp && <PopUpDeleteAll
            show={showDeleteAllPopUp}
            setShow={setShowDeleteAllPopUp}
            title={'Clear'}
            description={'Are you sure you want to clear the whole table?'}
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