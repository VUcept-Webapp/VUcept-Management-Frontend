import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PopUpEditAttendance } from '..';

/*
row: PropTypes.object.isRequired, // row of table
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired, // (show: Bool) => void
    onSave: PropTypes.func.isRequired, // ({ in
*/

const defaultRow = { email: 'email', event_id: 'event', status: 'Absent' };
const defaultTitle = 'title';
const defaultShow = true;
const defaultSetShow = () => undefined;
const defaultOnSave = () => undefined;

const setUp = ({ 
    row = defaultRow,
    show = defaultShow,
    setShow = defaultSetShow,
    title = defaultTitle,
    onSave = defaultOnSave
}) => {
    const utils = render(<PopUpEditAttendance
        row={row}
        show={show}
        setShow={setShow}
        title={title}
        onSave={onSave}
    />);
    const titleEle = utils.queryByTestId('popup-edit-attendance-title');
    const statusLabel = utils.queryByTestId('popup-edit-attendance-status-label');
    const statusCreatable = utils.queryByTestId('popup-edit-attendance-status-creatable');
    const cancel = screen.queryByText('Cancel');
    const save = screen.queryByText('Save');
    return {
        titleEle,
        statusLabel,
        statusCreatable,
        save,
        cancel,
        utils
    };
}

test('PopUpEditAttendance render', async () => {
    const { 
        titleEle,
        statusLabel,
        statusCreatable,
        save,
        cancel,
    } = setUp({ show: true });
    await expect(titleEle).toBeInTheDocument();
    await expect(titleEle).toHaveTextContent(defaultTitle);
    await expect(statusLabel).toBeInTheDocument();
    await expect(statusCreatable).toBeInTheDocument();
    await expect(save).toBeInTheDocument();
    await expect(cancel).toBeInTheDocument();
});

test('PopUpEditAttendance interaction', async () => {
    let status = '', email = '', event = '';
    const onSave = ({ inputStatus, inputEmail, inputEvent }) => {
        status = inputStatus;
        email = inputEmail;
        event = inputEvent;
    }
    const { 
        statusCreatable,
        save,
    } = setUp({ onSave });
    await fireEvent.keyDown(statusCreatable.firstChild, { key: 'ArrowDown' });
    await fireEvent.click(screen.getByText('Present'));
    await fireEvent.click(save);
    await expect(status).toEqual('Present');
    await expect(email).toEqual('email');
    await expect(event).toEqual('event');
});

test('PopUpEditAttendance hide', async () => {
    setUp({ show: false });
    await expect(screen.queryByTestId('block-div')).not.toHaveClass('show');
});

test('PopUpEditAttendance click cancel', async () => {
    let status = '', email = '', event = '';
    const onSave = ({ inputStatus, inputEmail, inputEvent }) => {
        status = inputStatus;
        email = inputEmail;
        event = inputEvent;
    }
    const {
        statusCreatable,
        cancel
    } = setUp({ onSave });
    await fireEvent.keyDown(statusCreatable.firstChild, { key: 'ArrowDown' });
    await fireEvent.click(screen.getByText('Present'));
    await fireEvent.click(cancel);
    await expect(status).toEqual('');
    await expect(email).toEqual('');
    await expect(event).toEqual('');
});