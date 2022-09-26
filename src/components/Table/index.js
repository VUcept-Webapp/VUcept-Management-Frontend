import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useState } from 'react';
import LeftDoubleArrowIcon from '../../assets/icons/leftDoubleArrow.svg';
import RightDoubleArrowIcon from '../../assets/icons/rightDoubleArrow.svg';
import { TABLE } from '../../lib/constants';

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

export const Table = (props) => {
    const {
        columns = [],
        rowNumber = 0,
    } = props;

    const totalPageNumber = Math.ceil(rowNumber / TABLE.ROW_PER_PAGE) || 1;
    const [curPage, setCurPage] = useState(1);

    return <div
        className={cx(styles.container)}
    >
        <div className={cx(styles.tableContainer)}>
            <table className={cx(styles.table)}>
                <tr>
                    {/*columns.map(column => <th>{column.label}</th>)*/}
                    <th><div className={cx(styles.header)}>Name</div></th>
                    <th>Email</th>
                    <th>User Type</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                <tr>
                    <td>dummy user one</td>
                    <td>aoiwjoianvowiagjvaiow@vanderbilt.edu</td>
                    <td>adviser</td>
                    <td>Registered</td>
                    <td>Name</td>
                </tr>
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