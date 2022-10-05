import styles from './index.module.css';
import classNames from 'classnames/bind';
import { PopUp } from '../PopUp';
import { TableButton } from '../TableButton';
import { useEffect, useRef, useState } from 'react';
import { TableSelect } from '../TableSelect';
import { USER_STATUS_OPTIONS, USER_TYPE_OPTIONS } from '../../lib/constants';
import { capitalizeUserType } from '../../lib/util';
const cx = classNames.bind(styles);


export const PopUpEditUser = (props) => {
    const {
        row = {},
        oldEmail = "",
        title,
        show,
        setShow,
        onSave,
    } = props;

    const { name = "", email = "", type = "", visions = "", status = "" } = row || {};
    const [selectedType, setSelectType] = useState(capitalizeUserType(type));
    const [selectedVisions, setSelectedVisions] = useState(visions);
    const [selectedStatus, setSelectedStatus] = useState(status);
    const [warnName, setWarnName] = useState(false);
    const [warnEmail, setWarnEmail] = useState(false);
    const [warnType, setWarnType] = useState(false);
    const [warnVisions, setWarnVisions] = useState(false);
    const [warnStatus, setWarnStatus] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();

    useEffect(() => {
        setSelectType({ label: capitalizeUserType(type), value: capitalizeUserType(type) });
        if(type && warnType) setWarnType(false);
    }, [type]);

    useEffect(() => {
        setSelectedStatus({ label: status, value: status });
        if(status && warnStatus) setWarnStatus(false);
    }, [status]);

    useEffect(() => {
        if(visions && warnVisions) setWarnVisions(false);
    }, [visions]);

    const onSaveEdit = () => {
        const inputName = nameRef.current.value;
        const inputEmail = emailRef.current.value;
        const inputType = selectedType?.value?.toLowerCase() || "";
        const inputVisions = inputType === 'vuceptor' ? (selectedVisions || "0") : "0";
        const inputStatus = selectedStatus?.value?.toLowerCase() || "";
        if(!inputName) setWarnName(true);
        if(!inputEmail) setWarnEmail(true);
        if(!inputType) setWarnEmail(true);
        if(!inputVisions) setWarnEmail(true);
        if(inputType !== 'VUceptor' && !inputStatus) setWarnStatus(true);
        if(inputName && inputEmail && inputType && inputStatus) {
            onSave({ inputName, inputEmail, inputType, inputVisions, inputStatus, oldEmail });
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
                defaultValue={name} 
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
                defaultValue={email} 
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
        <div className={cx(styles.editField)}>
            <span className={cx(styles.editLabel)}>Status: </span>
            <TableSelect
                options={USER_STATUS_OPTIONS}
                className={cx(styles.select)}
                height={25}
                selected={selectedStatus}
                warn={warnStatus}
                onChange={setSelectedStatus}
            />
        </div>
        <div className={cx(styles.editButtons)}>
            <TableButton className={cx(styles.editButton)} label={'Cancel'} onClick={() => setShow(false)}/>
            <TableButton className={cx(styles.editButton)} label={'Save'} onClick={onSaveEdit}/>
        </div>
    </PopUp>
}