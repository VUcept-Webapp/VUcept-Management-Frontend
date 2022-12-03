import { fireEvent, render, screen, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PopUpEditFy } from '..';
import { testStyle } from '../../../lib/testUtil';

const setUp = ({
    row = {},
    oldEmail = "",
    title = '',
    show = true,
    setShow = () => undefined,
    onSave = () => undefined,
}) => {
    const utils = render(<PopUpEditFy
        row={row}
        oldEmail={oldEmail}
        title={title}
        show={show}
        setShow={setShow}
        onSave={onSave}
    />);
    const fyTitle = utils.queryByTestId('pop-up-edit-fy-title');
    const name = utils.queryByTestId('pop-up-edit-fy-name');
    const email = utils.queryByTestId('pop-up-edit-fy-email');
    const visions = utils.queryByTestId('pop-up-edit-fy-visions');
    const buttons = utils.queryByTestId('pop-up-edit-fy-buttons');
    return {
        fyTitle,
        name,
        email,
        visions,
        buttons,
        utils
    };
}

test('PopUpEditFy render', async () => {
    const { 
        fyTitle,
        name,
        email,
        visions,
        buttons,
    } = setUp({});
    await expect(fyTitle).toBeInTheDocument();
    await expect(name).toBeInTheDocument();
    await expect(email).toBeInTheDocument();
    await expect(visions).toBeInTheDocument();
    await expect(buttons).toBeInTheDocument();
});