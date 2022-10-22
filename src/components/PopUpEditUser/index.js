import styles from './index.module.css';
import classNames from 'classnames/bind';
import { PopUp } from '../PopUp';
import { TableButton } from '../TableButton';
import { useEffect, useRef, useState } from 'react';
import { TableSelect } from '../TableSelect';
import { USER_TYPE_OPTIONS } from '../../lib/constants';
import { capitalizeUserType } from '../../lib/util';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Pop up for editting user
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
    const [warnName, setWarnName] = useState(false);
    const [warnEmail, setWarnEmail] = useState(false);
    const [warnType, setWarnType] = useState(false);
    const [warnVisions, setWarnVisions] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();

    useEffect(() => {
        setSelectType({ label: capitalizeUserType(type), value: capitalizeUserType(type) });
        if(type && warnType) setWarnType(false);
    }, [type]);

    useEffect(() => {
        if(visions && warnVisions) setWarnVisions(false);
    }, [visions]);

    const onSaveEdit = () => {
        const inputName = nameRef.current.value;
        const inputEmail = emailRef.current.value;
        const inputType = selectedType?.value?.toLowerCase() || "";
        const inputVisions = inputType === 'vuceptor' ? (selectedVisions || "0") : "0";
        if(!inputName) setWarnName(true);
        if(!inputEmail) setWarnEmail(true);
        if(!inputType) setWarnEmail(true);
        if(!inputVisions) setWarnEmail(true);
        if(inputName && inputEmail && inputType) {
            onSave({ inputName, inputEmail, inputType, inputVisions, oldEmail });
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
        <div className={cx(styles.editButtons)}>
            <TableButton className={cx(styles.editButton)} label={'Cancel'} onClick={() => setShow(false)}/>
            <TableButton className={cx(styles.editButton)} label={'Save'} onClick={onSaveEdit}/>
        </div>
    </PopUp>
}

PopUpEditUser.propTypes = {
    row: PropTypes.object, // row of table
    oldEmail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired, // (show: Bool) => void
    onSave: PropTypes.func.isRequired, // ({ inputName: String, inputEmail: String, inputGroup: String, inputWeek: String, inputStatus: String }) => void
}