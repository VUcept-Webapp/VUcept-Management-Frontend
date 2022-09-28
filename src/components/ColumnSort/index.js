import styles from './index.module.css';
import classNames from 'classnames/bind';
import SortIcon from '../../assets/icons/sort.svg';
import AscendSortIcon from '../../assets/icons/ascendSort.svg';
import DescendSortIcon from '../../assets/icons/descendSort.svg';
import Select from 'react-select';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

export const ColumnSort = (props) => {
    const {
        onChange
    } = props;

    const [sort, setSort] = useState(0);

    const getIcon = () => {
        if(sort === 0) return SortIcon;
        else if(sort === 1) return DescendSortIcon;
        else return AscendSortIcon;
    }

    useEffect(() => {
        if(typeof onChange === 'function') {
            onChange(sort);
        }
    }, [sort])
    
    return <div className={cx(styles.headerOperatorWrapper)}>
        <img src={getIcon()} className={cx(styles.headerOperationIcon)} onClick={() => setSort((sort + 1) % 3)}/>
    </div>
}