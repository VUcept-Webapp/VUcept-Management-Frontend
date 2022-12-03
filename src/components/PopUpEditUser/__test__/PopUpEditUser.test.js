import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PopUpEditUser } from '..';

const setUp = ({
    row = {},
    oldEmail = "email",
    title = 'test',
    show = true,
    setShow = () => undefined,
    onSave = () => undefined,
}) => {
    const utils = render(<PopUpEditUser
        row={row}
        title={title}
        show={show}
        setShow={setShow}
        onSave={onSave}
        oldEmail={oldEmail}
    />);
    const recordTitle = utils.queryByTestId('pop-up-edit-user-title');
    const name = utils.queryByTestId('pop-up-edit-user-name');
    const email = utils.queryByTestId('pop-up-edit-user-email');
    const type = utils.queryByTestId('pop-up-edit-user-type');
    const visions = utils.queryByTestId('pop-up-edit-user-visions');
    const buttons = utils.queryByTestId('pop-up-edit-user-buttons');
    return {
        recordTitle,
        name,
        email,
        buttons,
        type,
        visions,
        utils
    };
}

test('PopUpEditUser render', async () => {
    const { 
        recordTitle,
        name,
        email,
        buttons,
        type,
        visions,
    } = setUp({});
    await expect(recordTitle).toBeInTheDocument();
    await expect(name).toBeInTheDocument();
    await expect(email).toBeInTheDocument();
    await expect(buttons).toBeInTheDocument();
    await expect(type).toBeInTheDocument();
    await expect(visions).not.toBeInTheDocument();
});