import styles from './index.module.css';
import classNames from 'classnames/bind';
import FilterIcon from '../../assets/icons/filter.svg';
import Select from 'react-select';
import { useState } from 'react';
const cx = classNames.bind(styles);

const filterSelectStyles = {
    container: (provided) => ({
        ...provided,
        width: "170px",
        height: '20px',
        lineHeight: '20px',
    }),
    control: (provided) => ({
        ...provided,
        borderRadius: '10px',
        border: '1px solid rgba(221, 223, 226, 1)',
    }),
    option: (provided) => ({
        ...provided,
        fontFamily: 'Open Sans, sans-serif',
        fontSize: '13.3px',
        letterSpacing: '0.6px',
    }),
    placeholder: (provided) => ({
        ...provided,
        fontSize: '13.3px',
        color: 'rgba(186, 188, 193, 1)',
        lineHeight: '25px'
    }),
}

export const ColumnFilter = (props) => {
    const {
        options,
        onFilter,
    } = props;

    const [selected, setSelected] = useState();

    const [showSelect, setShowSelect] = useState(false);
    
    return <div className={cx(styles.headerOperatorWrapper)}>
        <img src={FilterIcon} className={cx(styles.headerOperationIcon)} onClick={() => setShowSelect(!showSelect)}/>
        {showSelect && <div className={cx(styles.filterSelect)}>
            <Select 
                options={options.map(option => ({label: option, value: option}))} 
                styles={filterSelectStyles} 
                isMulti 
                value={selected}
                onChange={(options) => {
                    setSelected(options);
                    if(typeof onFilter === 'function') onFilter(options);
                }}
                isClearable
                menuPortalTarget={document.body}
            />
        </div>}
    </div>
}