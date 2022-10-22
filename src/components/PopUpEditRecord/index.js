import styles from './index.module.css';
import classNames from 'classnames/bind';
import { PopUp } from '../PopUp';
import { TableButton } from '../TableButton';
import { useEffect, useRef, useState } from 'react';
import { TableSelect } from '../TableSelect';
import { ATTENDANCE_STATUS_OPTIONS, USER_TYPE_OPTIONS } from '../../lib/constants';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Pop up for editing attendance record
export const PopUpEditRecord = (props) => {
    const {
        row,
        title,
        show,
        setShow,
        onSave,
    } = props;

    const { name = "", email = "", group = "", week = "", status = "", } = row || {};
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedWeek, setSelectedWeek] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [warnName, setWarnName] = useState(false);
    const [warnEmail, setWarnEmail] = useState(false);
    const [warnGroup, setWarnGroup] = useState(false);
    const [warnWeek, setWarnWeek] = useState(false);
    const [warnStatus, setWarnStatus] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();

    useEffect(() => {
        setSelectedGroup({ label: group, value: group });
        if(group && warnGroup) setWarnGroup(false);
    }, [group]);

    useEffect(() => {
        setSelectedWeek({ label: week, value: week });
        if(week && warnWeek) setWarnWeek(false);
    }, [week]);

    useEffect(() => {
        setSelectedWeek({ label: status, value: status });
        if(status && warnStatus) setWarnStatus(false);
    }, [status]);

    const onSaveEdit = () => {
        const inputName = nameRef.current.value;
        const inputEmail = emailRef.current.value;
        const inputGroup = selectedGroup?.value || "";
        const inputWeek = selectedWeek?.value || "";
        const inputStatus = selectedStatus?.value || "";
        if(!inputName) setWarnName(true);
        if(!inputEmail) setWarnEmail(true);
        if(!inputGroup) setWarnGroup(true);
        if(!inputWeek) setWarnWeek(true);
        if(!inputStatus) setWarnStatus(true);
        if(inputName && inputEmail && inputGroup && inputWeek && inputStatus) {
            onSave({ inputName, inputEmail, inputGroup, inputWeek, inputStatus });
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
            <span className={cx(styles.editLabel)}>Group: </span>
            <TableSelect
                options={USER_TYPE_OPTIONS}
                className={cx(styles.select)}
                height={25}
                selected={selectedGroup}
                warn={warnGroup}
                onChange={setSelectedGroup}
            />
        </div>
        <div className={cx(styles.editField)}>
            <span className={cx(styles.editLabel)}>Week: </span>
            <TableSelect
                options={USER_TYPE_OPTIONS}
                className={cx(styles.select)}
                height={25}
                selected={selectedWeek}
                warn={warnWeek}
                onChange={setSelectedWeek}
            />
        </div>
        <div className={cx(styles.editField)}>
            <span className={cx(styles.editLabel)}>Status: </span>
            <TableSelect
                options={ATTENDANCE_STATUS_OPTIONS}
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

PopUpEditRecord.propTypes = {
    row: PropTypes.object, // row of table
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired, // (show: Bool) => void
    onSave: PropTypes.func.isRequired, // ({ inputName: String, inputEmail: String, inputGroup: String, inputWeek: String, inputStatus: String }) => void
}