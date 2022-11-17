import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import LeftDoubleArrowIcon from '../../assets/icons/leftDoubleArrow.svg';
import RightDoubleArrowIcon from '../../assets/icons/rightDoubleArrow.svg';
import { TABLE } from '../../lib/constants';
import TrashIcon from '../../assets/icons/trash.svg';
import PenIcon from '../../assets/icons/pen.svg';
import { ColumnFilter } from '../ColumnFilter';
import { ColumnSort } from '../ColumnSort';
import { ColumnSearch } from '../ColumnSearch';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

/**
 * Fill each column object of the table with ref
 * @param {Array} columns Array of column objects
 * @returns An array of column objects with ref
 */
const createCols = (columns) => {
    return columns.map((column) => ({
        ...column,
        ref: useRef()
    }));
};

// Table component
export const Table = (props) => {
    const {
        tablePage,
        totalPage,
        columns = [],
        rows = [],
        onEditRow,
        onDeleteRow,
        onPageChange,
    } = props;

    const [tableHeight, setTableHeight] = useState('auto');
    const [activeIndex, setActiveIndex] = useState(-1);
    const [hoverRow, setHoverRow] = useState(-1);
    const tableRef = useRef(null);
    const resizeStartX = useRef(null);
    const resizeLeft = useRef(null);
    const resizeRight = useRef(null);
    const cols = createCols(columns);

    // dynamically update tableHeight to set height of the dividing vertical lines between columns
    useEffect(() => {
        setTableHeight(tableRef?.current?.offsetHeight || 'auto');
    }, [rows.length]);

    // fill each column with 1fr initially
    useEffect(() => {
        const gridTemplateColumns = new Array(Object.keys(cols).length).fill('1fr').join(' ');
        tableRef.current.style.gridTemplateColumns = gridTemplateColumns;
    }, []);

    // drag event starts
    const onResizeMouseDown = (e, i) => {
        resizeStartX.current = e.clientX;
        resizeLeft.current = cols[i].ref.current.offsetWidth;
        resizeRight.current = cols[i + 1].ref.current.offsetWidth;
        setActiveIndex(i);
    }

    // dragging
    const onResizeMouseMove = (e) => {
        let totalWidth = 0;
        for(const col of cols) {
            totalWidth += col.ref.current.offsetWidth;
        }
        const gridColumns = cols.map((col, i) => {
            const delta = e.clientX - resizeStartX.current;
            let width = 0;
            const validWidth = resizeLeft.current + delta >= TABLE.MIN_COLUMN_WIDTH && resizeRight.current - delta >= TABLE.MIN_COLUMN_WIDTH;
            if (i === activeIndex && validWidth) {
                width = resizeLeft.current + delta;
                if(width < TABLE.MIN_COLUMN_WIDTH) width = TABLE.MIN_COLUMN_WIDTH;
                return `${width / totalWidth}fr`;
            }
            else if(i === activeIndex + 1 && validWidth) {
                width = resizeLeft.current - delta;
                if(width < TABLE.MIN_COLUMN_WIDTH) width = TABLE.MIN_COLUMN_WIDTH;
                return `${width / totalWidth}fr`;
            }
            else return `${col.ref.current.offsetWidth / totalWidth}fr`;
        });

        tableRef.current.style.gridTemplateColumns = `${gridColumns.join(" ")}`;
    };
    
    const removeListeners = () => {
        window.removeEventListener("mousemove", onResizeMouseMove);
        window.removeEventListener("mouseup", onResizeMouseUp);
        window.removeEventListener("mouseup", removeListeners);
    };

    // drop event
    const onResizeMouseUp = () => {
        setActiveIndex(-1);
        resizeStartX.current = null;
        resizeLeft.current = null;
        resizeRight.current = null;
        removeListeners();
    };

    const onRowMouseOver = (rowI) => {
        setHoverRow(rowI);
    }

    const onRowMouseOut = (rowI) => {
        if(hoverRow === rowI) setHoverRow(-1)
    }

    useEffect(() => {
        if (activeIndex !== -1) {
          window.addEventListener("mousemove", onResizeMouseMove);
          window.addEventListener("mouseup", onResizeMouseUp);
        }
        return () => {
          removeListeners();
        };
    }, [activeIndex]);

    return <div
        className={cx(styles.container)}
        data-testid='table-wrapper'
    >
        <div className={cx(styles.tableContainer)}>
            <table className={cx(styles.table)} ref={tableRef} cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        {cols.map((col, i) => <th ref={col.ref}>
                            <div className={cx(styles.header)} style={{minWidth: `${TABLE.MIN_COLUMN_WIDTH}px`}}>
                                <span className={cx(styles.headerLabel)}>{col.label}</span>
                                <div className={cx(styles.headerOperators)}>
                                    {col.sort && typeof col.sort === 'function' && <ColumnSort onSort={col.sort}/>}
                                    {col.filter && typeof col.filter === 'object' && <ColumnFilter options={col.filter.options} onFilter={col.filter.callback}/>}
                                    {col.search && typeof col.search === 'function' && <ColumnSearch onSearch={col.search} />}
                                </div>
                                {i !== cols.length - 1 && <div
                                    style={{height:`${tableHeight}px`}}
                                    className={cx(styles.resizeHandler)}
                                    onMouseDown={(e) => onResizeMouseDown(e, i)}
                                />}
                            </div>
                        </th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((rawRow, rowI) => <tr onMouseOver={() => onRowMouseOver(rowI)} onMouseOut={() => onRowMouseOut(rowI)}>
                        {cols.map((col, colI) => <td>
                            {col.render(rawRow[col.key], rowI, colI)}
                            {colI === columns.length - 1 && <div className={cx(styles.rowOperators, {
                                [styles.show]: hoverRow === rowI
                            })}>
                                {typeof onDeleteRow === 'function' && <img src={TrashIcon} className={cx(styles.rowIcon)} onClick={() => onDeleteRow(rows[rowI])}/>}
                                {typeof onEditRow === 'function' && <img src={PenIcon} className={cx(styles.rowIcon)} onClick={() => onEditRow(rows[rowI])}/>}
                            </div>}
                        </td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>
        <div className={cx(styles.pages)}>
            <img 
                src={LeftDoubleArrowIcon} 
                className={cx(styles.arrowIcon, styles.leftDoubleArrow)} 
                onClick={() => onPageChange(tablePage - 1 > 0 ? tablePage - 1 : tablePage)}
            />
            {tablePage - 1 > 0 && <span 
                className={cx(styles.page)} 
                onClick={() => onPageChange(tablePage - 1)}
            >
                {tablePage - 1}
            </span>}
            <span 
                className={cx(styles.page, styles.selectedPage)}
            >
                {tablePage}
            </span>
            {tablePage + 1 <= totalPage && <span 
                className={cx(styles.page)} 
                onClick={() => onPageChange(tablePage + 1)}
            >
                {tablePage + 1}
            </span>}
            <img 
                src={RightDoubleArrowIcon} 
                className={cx(styles.arrowIcon, styles.rightDoubleArrow)} 
                onClick={() => onPageChange(tablePage + 1 <= totalPage ? tablePage + 1 : tablePage)}
            />
        </div>
    </div>;
}

Table.propTypes = {
    tablePage: PropTypes.number.isRequired,
    totalPage: PropTypes.number.isRequired,
    columns: PropTypes.array,
    rows: PropTypes.array.isRequired,
    onEditRow: PropTypes.func, // (row: Row) => void
    onDeleteRow: PropTypes.func, // (row: Row) => void
    onPageChange: PropTypes.func // (page: Number) => void
}