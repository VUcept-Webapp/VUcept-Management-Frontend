import styles from './index.module.css';
import classNames from 'classnames/bind';
import { PopUp } from '../PopUp';
import { TableButton } from '../TableButton';
import { useEffect, useRef, useState } from 'react';
import { TableSelect } from '../TableSelect';
import { USER_TYPE_OPTIONS } from '../../lib/constants';
const cx = classNames.bind(styles);


export const PopUpEditFy = (props) => {
    const {
        row = {},
        oldEmail = "",
        title,
        show,
        setShow,
        onSave,
    } = props;

    const { fy_name: name = "", fy_email: email = "", visions = "" } = row || {};
    const [selectedVisions, setSelectedVisions] = useState(visions);
    const [warnName, setWarnName] = useState(false);
    const [warnEmail, setWarnEmail] = useState(false);
    const [warnVisions, setWarnVisions] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();


    useEffect(() => {
        if(selectedVisions && warnVisions) setWarnVisions(false);
    }, [selectedVisions]);

    const onSaveEdit = () => {
        const inputName = nameRef.current.value;
        const inputEmail = emailRef.current.value;
        const inputVisions = selectedVisions;
        if(!inputName) setWarnName(true);
        if(!inputEmail) setWarnEmail(true);
        if(!inputVisions) setWarnVisions(true);
        if(inputName && inputEmail && inputVisions) {
            onSave({ inputName, inputEmail, inputVisions, oldEmail });
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
                defaultValue={name}
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
                defaultValue={email} 
                onChange={(e) => {
                    if(warnEmail && e.target.value) setWarnEmail(false);
                }}
            />
        </div>
        <div className={cx(styles.editField)}>
            <span className={cx(styles.editLabel)}>Visions: </span>
            <input 
                className={cx(styles.editInput, {[styles.warn]: warnVisions})} 
                value={selectedVisions}
                onChange={(e) => {
                    let val = parseInt(e.target.value) === 0 ? 0 : (parseInt(e.target.value) || '');
                    setSelectedVisions(val);
                }}
            />
        </div>
        <div className={cx(styles.editButtons)}>
            <TableButton className={cx(styles.editButton)} label={'Cancel'} onClick={() => setShow(false)}/>
            <TableButton className={cx(styles.editButton)} label={'Save'} onClick={onSaveEdit}/>
        </div>
    </PopUp>
}