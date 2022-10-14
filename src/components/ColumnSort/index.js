import styles from './index.module.css';
import classNames from 'classnames/bind';
import SortIcon from '../../assets/icons/sort.svg';
import AscendSortIcon from '../../assets/icons/ascendSort.svg';
import DescendSortIcon from '../../assets/icons/descendSort.svg';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { SORT } from '../../lib/constants';
const cx = classNames.bind(styles);

export const ColumnSort = (props) => {
    const {
        onSort
    } = props;

    const [sort, setSort] = useState(0);

    const getIcon = () => {
        if(sort === SORT.NO_SORT) return SortIcon;
        else if(sort === SORT.DESCEND) return DescendSortIcon;
        else return AscendSortIcon;
    }

    useEffect(() => {
        if(typeof onSort === 'function') {
            onSort(sort);
        }
    }, [sort])
    
    return <div className={cx(styles.headerOperatorWrapper)}>
        <img src={getIcon()} className={cx(styles.headerOperationIcon)} onClick={() => setSort((sort + 1) % 3)}/>
    </div>
}