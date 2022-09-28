import styles from './index.module.css';
import classNames from 'classnames/bind';
import { PopUp } from '../PopUp';
import { TableButton } from '../TableButton';
import { useRef, useState } from 'react';
const cx = classNames.bind(styles);


export const PopUpEditUser = (props) => {
    const {
        title,
        show,
        setShow,
        name = "",
        email = "",
        type = "",
        onSave,
    } = props;

    const [warnName, setWarnName] = useState(false);
    const [warnEmail, setWarnEmail] = useState(false);
    const [warnType, setWarnType] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const typeRef = useRef();

    const onSaveEdit = () => {
        const inputName = nameRef.current.value;
        const inputEmail = emailRef.current.value;
        const inputType = typeRef.current.value;
        if(!inputName) setWarnName(true);
        if(!inputEmail) setWarnEmail(true);
        if(!inputType) setWarnType(true);
        if(inputName && inputEmail && inputType) {
            onSave();
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
            <input 
                className={cx(styles.editInput, {[styles.warn]: warnType})}
                defaultValue={type}
                ref={typeRef}
                onChange={(e) => {
                    if(warnType && e.target.value) setWarnType(false);
                }}
            />
        </div>
        <div className={cx(styles.editButtons)}>
            <TableButton className={cx(styles.editButton)} label={'Cancel'} onClick={() => setShow(false)}/>
            <TableButton className={cx(styles.editButton)} label={'Save'} onClick={onSaveEdit}/>
        </div>
    </PopUp>
}