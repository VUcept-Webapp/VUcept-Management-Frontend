import styles from './index.module.css';
import classNames from 'classnames/bind';
import Papa from "papaparse";
import { BUTTONS, RESPONSE_STATUS, SORT, TABLE } from '../../lib/constants';
import { TableButton } from '../../components/TableButton';
import { Table } from '../../components/Table';
import { useEffect, useRef, useState } from 'react';
import { PopUpDeleteRow } from '../../components/PopUpDeleteRow';
import { PopUpDeleteAll } from '../../components/PopUpDeleteAll';
import { resetFy, visionsNums, createFy, readFy, updateFy, deleteFy, fyLoadfromcsv } from '../../lib/services';
import { getOptionValue, getSortParam, importUsersToJSON, toUpperRows, updateOrder } from '../../lib/util';
import { BlockBlocker } from '../../components/BlockBlocker';
import { TableItem } from '../../components/TableItem';
import { PopUpAddFy } from '../../components/PopUpAddFy';
import { PopUpEditFy } from '../../components/PopUpEditFy';
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


    const getFy = () => {
        visionsNums().then(res => {
            const { status, result } = res;
            if(status === RESPONSE_STATUS.SUCCESS) {
                const { list } = result;
                setVisionOptions(list.map(option => option.visions.toString()));
            }
            else toast('Error fetching visions options');
        }).catch(err => toast('Error fetching visions options'));
        readFy({
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
        }).then(res => {
            const { status, result: { rows = [], pages = 1 } } = res;
            console.log(res);
            setDisableTable(false);
            if(status === RESPONSE_STATUS.SUCCESS) {
                setRows(toUpperRows(rows));
                setTotalPage(parseInt(pages));
            }
            else if(status === RESPONSE_STATUS.INCORRECT_FY_NAME) toast('Incorrect search for First-year name');
            else if(status === RESPONSE_STATUS.INCORRECT_FY_EMAIL) toast('Incorrect search for Email');
            else if(status === RESPONSE_STATUS.INCORRECT_FY_VISIONS) toast('Incorrect filter for Visions');
            else toast('Internal error');
        })
        .catch(err => {
            setDisableTable(false);
            toast('Internal error');
        });
    }

    useEffect(() => {
        setDisableTable(true);
        getFy();
    }, [tablePage, nameSearch, nameSort, emailSearch, emailSort, visionsFilter, vuceptorFilter, vuceptorSearch]);

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
                    fyLoadfromcsv({ file: inputObj })
                        .then(res => {
                            console.log(res);
                            const { status } = res;
                            if(status === RESPONSE_STATUS.SUCCESS) getFy();
                            else if(status === RESPONSE_STATUS.EMAIL_USED) {
                                toast('There were repeated emails. Only users with valid email were imported');
                                getFy();
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
        deleteFy({ email: row?.fy_email || "" })
            .then(res => {
                setShowDeletePopUp(false);
                const { status } = res;
                if(status === RESPONSE_STATUS.SUCCESS) getFy();
                else if(status === RESPONSE_STATUS.INCORRECT_USER_EMAIL) toast('Email is not found');
                else toast('Internal error');
            })
            .catch(err => toast('Internal error'));
    }

    const onConfirmClear = () => {
        resetFy()
            .then(res => {
                const { status } = res;
                setShowDeleteAllPopUp(false);
                if(status === RESPONSE_STATUS.SUCCESS) getFy();
                else toast('Error resetting system');
            })
    }

    const onSaveEdit = ({ inputName, inputEmail, inputVisions, oldEmail }) => {
        updateFy({ old_email: oldEmail, name: inputName, email: inputEmail, visions: inputVisions })
            .then(res => {
                const { status } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    setShowEditPopUp(false);
                    getFy();
                }
                else if(status === RESPONSE_STATUS.EMAIL_USED) toast('Email is used');
                else if(status === RESPONSE_STATUS.INCORRECT_FY_VISIONS) toast('Incorrect vision group');
                else toast('Internal error');
            })
            .catch(err => toast('Internal error'));
    }

    const onAddFy = ({ inputName, inputEmail, inputVisions }) => {
        createFy({ name: inputName, email: inputEmail, visions: inputVisions })
            .then(res => {
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
            })
            .catch(err => toast('Internal error'));
    }   

    const onPageChange = (curPage) => {
        setTablePage(curPage - 1);
    }

    const columns = [
        {
            key: 'fy_name',
            label: 'First-year Name',
            search: (value) => setNameSearch(value),
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
            key: 'vuceptor_name',
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
            <TableButton className={cx(styles.tableButton)} label={BUTTONS.RESET} onClick={() => setShowDeleteAllPopUp(true)}/>
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