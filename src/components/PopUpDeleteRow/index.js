import styles from './index.module.css';
import classNames from 'classnames/bind';
import { PopUp } from '../PopUp';
import { TableButton } from '../TableButton';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Pop up for deleting a row
export const PopUpDeleteRow = (props) => {
    const {
        row,
        show,
        setShow,
        title,
        description,
        onDelete,
    } = props;

    const { name = "", fy_name = "" } = row || {};

    const onRemove = () => {
        onDelete(row);
    }

    return <PopUp 
        className={cx(styles.deletePopUp)}
        show={show}
        setShow={setShow}
    >
        <div className={cx(styles.deleteCaption)} data-testid='popup-delete-row-title'>{title}</div>
        <div className={cx(styles.deleteText)} data-testid='popup-delete-row-description'>{description}</div>
        <div className={cx(styles.deleteName)} data-testid='popup-delete-row-name'>{name || fy_name}</div>
        <div className={cx(styles.deleteButtons)}>
            <TableButton className={cx(styles.deleteButton)} label={'Cancel'} onClick={() => setShow(false)}/>
            <TableButton className={cx(styles.deleteButton)} label={'Remove'} onClick={onRemove}/>
        </div>
    </PopUp>
}

PopUpDeleteRow.propTypes = {
    row: PropTypes.object.isRequired, // one row of the table
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    onDelete: PropTypes.func.isRequired // (row: Object) => void
}