import styles from './index.module.css';
import classNames from 'classnames/bind';
import { PopUp } from '../PopUp';
import { TableButton } from '../TableButton';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Creatable from 'react-select/creatable';
import { EDIT_ATTENDANCE_STATUS_OPTIONS } from '../../lib/constants';
const cx = classNames.bind(styles);

const filterSelectStyles = {
    container: (provided) => ({
        ...provided,
        width: "100%",
        minHeight: `25px`,
        height: `25px`,
        fontSize: '13.3px',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.6px',
    }),
    control: (provided) => ({
        ...provided,
        borderRadius: '5px',
        border: '1px solid rgba(111, 111, 111, 1)',
        minHeight: `25px`,
        height: `25px`,
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        height: `25px`,
        padding: '0 6px'
    }),
    input: (provided) => ({
        ...provided,
        margin: '0px',
    }),
    placeholder: () => ({
        display: 'none'
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: `25px`,
    }),
    menuPortal: (provided, state) => ({ 
        ...provided,
        zIndex: 1000
    })
}

// Pop up for editing attendance record
export const PopUpEditAttendance = (props) => {
    const {
        row = {},
        title,
        show,
        setShow,
        onSave,
    } = props;
    const { email = "", status = "", event_id = "" } = row || {};
    const [selectedStatus, setSelectedStatus] = useState(status);

    useEffect(() => {
        setSelectedStatus(status);
    }, [status]);

    const onSaveEdit = () => {
        const inputStatus = selectedStatus;
        if(inputStatus ) {
            onSave({ inputEmail: email, inputStatus, inputEvent: event_id });
        }
    }

    return <PopUp 
        className={cx(styles.editPopUp)}
        show={show}
        setShow={setShow}
    >
        <div className={cx(styles.editCaption)} data-testid='popup-edit-attendance-title'>{title}</div>
        <div className={cx(styles.editField)}>
            <span className={cx(styles.editLabel)} data-testid='popup-edit-attendance-status-label'>Status: </span>
            <div className={cx(styles.creatableContainer)} data-testid='popup-edit-attendance-status-creatable'>
                <Creatable 
                    value={{ label: selectedStatus, value: selectedStatus }}
                    onChange={(option) => setSelectedStatus(option?.value || "")}
                    options={EDIT_ATTENDANCE_STATUS_OPTIONS}
                    styles={filterSelectStyles}
                />
            </div>
        </div>
        <div className={cx(styles.editButtons)}>
            <TableButton className={cx(styles.editButton)} label={'Cancel'} onClick={() => setShow(false)}/>
            <TableButton className={cx(styles.editButton)} label={'Save'} onClick={onSaveEdit}/>
        </div>
    </PopUp>
}

PopUpEditAttendance.propTypes = {
    row: PropTypes.object.isRequired, // row of table
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired, // (show: Bool) => void
    onSave: PropTypes.func.isRequired, // ({ inputName: String, inputEmail: String, inputVisions: String, oldEmail: String }) => void
}