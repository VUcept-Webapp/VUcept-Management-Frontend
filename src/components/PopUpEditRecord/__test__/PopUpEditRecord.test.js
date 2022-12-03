import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PopUpEditRecord } from '..';

const setUp = ({
    row = {},
    title = 'test',
    show = true,
    setShow = () => undefined,
    onSave = () => undefined,
}) => {
    const utils = render(<PopUpEditRecord
        row={row}
        title={title}
        show={show}
        setShow={setShow}
        onSave={onSave}
    />);
    const recordTitle = utils.queryByTestId('pop-up-edit-record-title');
    const name = utils.queryByTestId('pop-up-edit-record-name');
    const email = utils.queryByTestId('pop-up-edit-record-email');
    const group = utils.queryByTestId('pop-up-edit-record-group');
    const week = utils.queryByTestId('pop-up-edit-record-week');
    const status = utils.queryByTestId('pop-up-edit-record-status');
    const buttons = utils.queryByTestId('pop-up-edit-record-buttons');
    return {
        recordTitle,
        name,
        email,
        buttons,
        group,
        week,
        status,
        utils
    };
}

test('PopUpEditRecord render', async () => {
    const { 
        recordTitle,
        name,
        email,
        buttons,
        group,
        week,
        status,
    } = setUp({});
    await expect(recordTitle).toBeInTheDocument();
    await expect(name).toBeInTheDocument();
    await expect(email).toBeInTheDocument();
    await expect(buttons).toBeInTheDocument();
    await expect(group).toBeInTheDocument();
    await expect(week).toBeInTheDocument();
    await expect(status).toBeInTheDocument();
});