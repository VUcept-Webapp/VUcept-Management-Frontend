import styles from './index.module.css';
import classNames from 'classnames/bind';
import { PopUp } from '../PopUp';
import { TableButton } from '../TableButton';
import { useEffect, useRef, useState } from 'react';
import { TableSelect } from '../TableSelect';
import { USER_TYPE_OPTIONS } from '../../lib/constants';
const cx = classNames.bind(styles);


export const PopUpAddUser = (props) => {
    const {
        title,
        show,
        setShow,
        onAdd,
    } = props;

    const [selectedType, setSelectType] = useState("");
    const [selectedVisions, setSelectedVisions] = useState("");
    const [warnName, setWarnName] = useState(false);
    const [warnEmail, setWarnEmail] = useState(false);
    const [warnType, setWarnType] = useState(false);
    const [warnVisions, setWarnVisions] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();

    useEffect(() => {
        if(selectedType && warnType) setWarnType(false);
    }, [selectedType]);

    useEffect(() => {
        if(selectedVisions && warnVisions) setWarnVisions(false);
    }, [selectedVisions]);

    const onSaveAdd = () => {
        const inputName = nameRef.current.value;
        const inputEmail = emailRef.current.value;
        const inputType = selectedType?.value.toLowerCase() || "";
        const inputVisions = inputType === 'vuceptor' ? (selectedVisions || "0") : "0";
        if(!inputName) setWarnName(true);
        if(!inputEmail) setWarnEmail(true);
        if(!inputType) setWarnType(true);
        if(!inputVisions) setWarnVisions(true);
        if(inputName && inputEmail && inputType) {
            onAdd({ inputName, inputEmail, inputType, inputVisions });
        }
    }

    return <PopUp 
        className={cx(styles.editPopUp)}
        show={show}
        setShow={setShow}
    >
        <div className={cx(styles.editCaption)}>{title}</div>
        <div className={cx(styles.editField)}>
            <span className={cx(styles.editLabel)}>Name: </span>
            <input 
                className={cx(styles.editInput, {[styles.warn]: warnName})} 
                ref={nameRef}
                onChange={(e) => {
                    if(warnName && e.target.value) setWarnName(false);
                }}
            />
        </div>
        <div className={cx(styles.editField)}>
            <span className={cx(styles.editLabel)}>Email: </span>
            <input 
                className={cx(styles.editInput, {[styles.warn]: warnEmail})} 
                ref={emailRef}
                onChange={(e) => {
                    if(warnEmail && e.target.value) setWarnEmail(false);
                }}
            />
        </div>
        <div className={cx(styles.editField)}>
            <span className={cx(styles.editLabel)}>Type: </span>
            <TableSelect
                options={USER_TYPE_OPTIONS}
                className={cx(styles.select)}
                height={25}
                selected={selectedType}
                warn={warnType}
                onChange={setSelectType}
            />
        </div>
        {selectedType?.value === 'VUceptor' && <div className={cx(styles.editField)}>
            <span className={cx(styles.editLabel)}>Visions: </span>
            <input 
                className={cx(styles.editInput, {[styles.warn]: warnVisions})} 
                value={selectedVisions}
                onChange={(e) => {
                    setSelectedVisions(e.target.value);
                }}
            />
        </div>}
        <div className={cx(styles.editButtons)}>
            <TableButton className={cx(styles.editButton)} label={'Cancel'} onClick={() => setShow(false)}/>
            <TableButton className={cx(styles.editButton)} label={'Add'} onClick={onSaveAdd}/>
        </div>
    </PopUp>
}