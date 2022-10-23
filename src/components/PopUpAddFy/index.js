import styles from './index.module.css';
import classNames from 'classnames/bind';
import { PopUp } from '../PopUp';
import { TableButton } from '../TableButton';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Pop up for adding first-year student
export const PopUpAddFy = (props) => {
    const {
        title,
        show,
        setShow,
        onAdd,
    } = props;

    const [selectedVisions, setSelectedVisions] = useState("");
    const [warnName, setWarnName] = useState(false);
    const [warnEmail, setWarnEmail] = useState(false);
    const [warnVisions, setWarnVisions] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();


    useEffect(() => {
        if(selectedVisions && warnVisions) setWarnVisions(false);
    }, [selectedVisions]);

    const onSaveAdd = () => {
        const inputName = nameRef.current.value;
        const inputEmail = emailRef.current.value;
        const inputVisions = selectedVisions;
        if(!inputName) setWarnName(true);
        if(!inputEmail) setWarnEmail(true);
        if(!inputVisions) setWarnVisions(true);
        if(inputName && inputEmail && inputVisions) {
            onAdd({ inputName, inputEmail, inputVisions });
        }
    }

    return <PopUp 
        className={cx(styles.editPopUp)}
        show={show}
        setShow={setShow}
    >
        <div className={cx(styles.editCaption)} data-testid='popup-add-fy-title'>{title}</div>
        <div className={cx(styles.editField)}>
            <span className={cx(styles.editLabel)} data-testid='popup-add-fy-name-label'>Name: </span>
            <input 
                data-testid='popup-add-fy-name-input'
                className={cx(styles.editInput, {[styles.warn]: warnName})} 
                ref={nameRef}
                onChange={(e) => {
                    if(warnName && e.target.value) setWarnName(false);
                }}
            />
        </div>
        <div className={cx(styles.editField)}>
            <span className={cx(styles.editLabel)} data-testid='popup-add-fy-email-label'>Email: </span>
            <input
                data-testid='popup-add-fy-email-input' 
                className={cx(styles.editInput, {[styles.warn]: warnEmail})} 
                ref={emailRef}
                onChange={(e) => {
                    if(warnEmail && e.target.value) setWarnEmail(false);
                }}
            />
        </div>
        <div className={cx(styles.editField)}>
            <span className={cx(styles.editLabel)} data-testid='popup-add-fy-visions-label'>Visions: </span>
            <input
                data-testid='popup-add-fy-visions-input'
                className={cx(styles.editInput, {[styles.warn]: warnVisions})} 
                value={selectedVisions}
                onChange={(e) => {
                    let val = parseInt(e.target.value) === 0 ? 0 : (parseInt(e.target.value) || '');
                    setSelectedVisions(val);
                }}
            />
        </div>
        <div className={cx(styles.editButtons)}>
            <TableButton className={cx(styles.editButton)} label={'Cancel'} onClick={() => setShow(false)} data-testid='popup-add-fy-cancel'/>
            <TableButton className={cx(styles.editButton)} label={'Add'} onClick={onSaveAdd} data-testid='popup-add-fy-add'/>
        </div>
    </PopUp>
}

PopUpAddFy.propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired, // (show: Bool) => void
    onAdd: PropTypes.func.isRequired // ({ inputName: String, inputEmail: String, inputVisions: String }) => void
}