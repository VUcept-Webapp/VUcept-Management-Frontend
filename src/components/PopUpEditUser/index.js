import styles from './index.module.css';
import classNames from 'classnames/bind';
import { PopUp } from '../PopUp';
import { TableButton } from '../TableButton';
import { useEffect, useRef, useState } from 'react';
import { TableSelect } from '../TableSelect';
import { USER_TYPE_OPTIONS } from '../../lib/constants';
const cx = classNames.bind(styles);


export const PopUpEditUser = (props) => {
    const {
        row = {},
        title,
        show,
        setShow,
        onSave,
    } = props;

    const { name = "", email = "", type = "", visions = "" } = row || {};
    const [selectedType, setSelectType] = useState(type);
    const [selectedVisions, setSelectedVisions] = useState(visions);
    const [warnName, setWarnName] = useState(false);
    const [warnEmail, setWarnEmail] = useState(false);
    const [warnType, setWarnType] = useState(false);
    const [warnVisions, setWarnVisions] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();

    useEffect(() => {
        setSelectType({ label: type, value: type });
        if(type && warnType) setWarnType(false);
    }, [type]);

    useEffect(() => {
        setSelectedVisions({ label: visions, value: visions });
        if(visions && warnVisions) setWarnVisions(false);
    }, [visions]);

    const onSaveEdit = () => {
        const inputName = nameRef.current.value;
        const inputEmail = emailRef.current.value;
        const inputType = selectedType?.value || "";
        const inputVisions = inputType === 'VUceptor' ? (selectedVisions?.value || "") : "";
        if(!inputName) setWarnName(true);
        if(!inputEmail) setWarnEmail(true);
        if(!inputType) setWarnEmail(true);
        if(!inputVisions) setWarnEmail(true);
        if(inputName && inputEmail && inputType && inputVisions) {
            onSave({ inputName, inputEmail, inputType, inputVisions });
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
            <TableSelect
                options={USER_TYPE_OPTIONS}
                className={cx(styles.select)}
                height={25}
                selected={selectedVisions}
                warn={warnVisions}
                onChange={setSelectedVisions}
            />
        </div>}
        <div className={cx(styles.editButtons)}>
            <TableButton className={cx(styles.editButton)} label={'Cancel'} onClick={() => setShow(false)}/>
            <TableButton className={cx(styles.editButton)} label={'Save'} onClick={onSaveEdit}/>
        </div>
    </PopUp>
}