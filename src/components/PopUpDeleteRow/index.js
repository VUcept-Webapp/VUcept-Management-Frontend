import styles from './index.module.css';
import classNames from 'classnames/bind';
import { PopUp } from '../PopUp';
import { TableButton } from '../TableButton';
import { useRef, useState } from 'react';
const cx = classNames.bind(styles);


export const PopUpDeleteRow = (props) => {
    const {
        show,
        setShow,
        title,
        description,
        content,
        onDelete,
    } = props;

    return <PopUp 
        className={cx(styles.deletePopUp)}
        show={show}
        setShow={setShow}
    >
        <div className={cx(styles.deleteCaption)}>{title}</div>
        <div className={cx(styles.deleteText)}>{description}</div>
        <div className={cx(styles.deleteName)}>{content}</div>
        <div className={cx(styles.deleteButtons)}>
            <TableButton className={cx(styles.deleteButton)} label={'Cancel'} onClick={() => setShow(false)}/>
            <TableButton className={cx(styles.deleteButton)} label={'Remove'} onClick={onDelete}/>
        </div>
    </PopUp>
}