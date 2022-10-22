import styles from './index.module.css';
import classNames from 'classnames/bind';
import { PopUp } from '../PopUp';
import { TableButton } from '../TableButton';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Pop up for resetting User Management
export const PopUpDeleteAll = (props) => {
    const {
        show,
        setShow,
        title,
        description,
        onDelete,
    } = props;


    const onRemove = () => {
        onDelete();
    }

    return <PopUp 
        className={cx(styles.deletePopUp)}
        show={show}
        setShow={setShow}
    >
        <div className={cx(styles.deleteCaption)}>{title}</div>
        <div className={cx(styles.deleteText)}>{description}</div>
        <div className={cx(styles.deleteButtons)}>
            <TableButton className={cx(styles.deleteButton)} label={'Cancel'} onClick={() => setShow(false)}/>
            <TableButton className={cx(styles.deleteButton)} label={'Clear'} onClick={onRemove}/>
        </div>
    </PopUp>
}

PopUpDeleteAll.propTypes = { 
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired, // (show: Bool) => void
    title: PropTypes.string,
    description: PropTypes.string,
    onDelete: PropTypes.func.isRequired, // () => void
}