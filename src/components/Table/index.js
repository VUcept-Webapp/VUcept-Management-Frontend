import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect, useCallback } from 'react';
import LeftDoubleArrowIcon from '../../assets/icons/leftDoubleArrow.svg';
import RightDoubleArrowIcon from '../../assets/icons/rightDoubleArrow.svg';
import { TABLE } from '../../lib/constants';
import TrashIcon from '../../assets/icons/trash.svg';
import PenIcon from '../../assets/icons/pen.svg';
import { useColumns } from '../../lib/hooks';

const cx = classNames.bind(styles);

/*
    columns: [{
        label,
        sort
        filter: [{label, value}]
        className,
        style
    }]
    rows: {
        label: (label) => <></>
    }
    rowNumber
*/

const createCols = (columns) => {
    return columns.map((column) => ({
        ...column,
        ref: useRef()
    }));
};

export const Table = (props) => {
    const {
        height = 200,
        columns = [],
        rows = [],
        rowNumber = 0,
    } = props;

    const totalPageNumber = Math.ceil(rowNumber / TABLE.ROW_PER_PAGE) || 1;
    const [curPage, setCurPage] = useState(1);
    const [tableHeight, setTableHeight] = useState('auto');
    const [activeIndex, setActiveIndex] = useState(-1);
    const tableRef = useRef(null);
    const resizeStartX = useRef(null);
    const resizeLeft = useRef(null);
    const resizeRight = useRef(null);
    const cols = createCols(columns);

    useEffect(() => {
        if(tableRef?.current?.offsetHeight) setTableHeight(tableRef?.current?.offsetHeight);
    }, [tableRef?.current?.offsetHeight]);

    useEffect(() => {
        console.log(tableHeight);
    }, [tableHeight])

    useEffect(() => {
        const gridTemplateColumns = new Array(cols.length).fill('1fr').join(' ');
        tableRef.current.style.gridTemplateColumns = gridTemplateColumns;
    }, []);

    const onResizeMouseDown = (e, i) => {
        resizeStartX.current = e.clientX;
        resizeLeft.current = cols[i].ref.current.offsetWidth;
        resizeRight.current = cols[i + 1].ref.current.offsetWidth;
        setActiveIndex(i);
    }

    const onResizeMouseMove = (e) => {
        const gridColumns = cols.map((col, i) => {
            const delta = e.clientX - resizeStartX.current;
            const validWidth = resizeLeft.current + delta >= TABLE.MIN_COLUMN_WIDTH && resizeRight.current - delta >= TABLE.MIN_COLUMN_WIDTH;
            if (i === activeIndex && validWidth) return `${resizeLeft.current + delta}px`;
            else if(i === activeIndex + 1 && validWidth) return `${resizeRight.current - delta}px`;
            else return `${col.ref.current.offsetWidth}px`;
        });

        tableRef.current.style.gridTemplateColumns = `${gridColumns.join(" ")}`;
    };
    
    const removeListeners = () => {
        window.removeEventListener("mousemove", onResizeMouseMove);
        window.removeEventListener("mouseup", onResizeMouseUp);
        window.removeEventListener("mouseup", removeListeners);
    };

    const onResizeMouseUp = () => {
        setActiveIndex(-1);
        resizeStartX.current = null;
        resizeLeft.current = null;
        resizeRight.current = null;
        removeListeners();
    };

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
        style={{ height: `${height}px` }}
    >
        <div className={cx(styles.tableContainer)}>
            <table className={cx(styles.table)} ref={tableRef} cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        {cols.map((col, i) => <th ref={col.ref}>
                            <div className={cx(styles.header)}>
                                <span className={cx(styles.headerLabel)}>{col.label}</span>
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
                    {rows.map(row => <tr>
                        {row.map((td, i) => <td>
                            {td}
                            {i === row.length - 1 && <>
                                <img src={TrashIcon} className={cx(styles.rowIcon)}/>
                                <img src={PenIcon} className={cx(styles.rowIcon)}/>
                            </>}
                        </td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>
        <div className={cx(styles.pages)}>
            <img 
                src={LeftDoubleArrowIcon} 
                className={cx(styles.arrowIcon, styles.leftDoubleArrow)} 
                onClick={() => setCurPage(curPage - 1 > 0 ? curPage - 1 : curPage)}
            />
            {curPage - 1 > 0 && <span 
                className={cx(styles.page)} 
                onClick={() => setCurPage(curPage - 1)}
            >
                {curPage - 1}
            </span>}
            <span 
                className={cx(styles.page, styles.selectedPage)}
            >
                {curPage}
            </span>
            {curPage + 1 <= totalPageNumber && <span 
                className={cx(styles.page)} 
                onClick={() => setCurPage(curPage + 1)}
            >
                {curPage + 1}
            </span>}
            <img 
                src={RightDoubleArrowIcon} 
                className={cx(styles.arrowIcon, styles.rightDoubleArrow)} 
                onClick={() => setCurPage(curPage + 1 <= totalPageNumber ? curPage + 1 : curPage)}
            />
        </div>
    </div>;
}