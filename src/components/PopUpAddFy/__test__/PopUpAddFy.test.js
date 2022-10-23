import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PopUpAddFy } from '..';
import { testStyle } from '../../../lib/testUtil';
import { act } from 'react-dom/test-utils';

const defaultTitle = 'title';
const defaultShow = true;
const defaultSetShow = () => undefined;
const defaultOnAdd = () => undefined;

const setUp = ({ 
    title = defaultTitle,
    show = defaultShow,
    setShow = defaultSetShow,
    onAdd = defaultOnAdd,
}) => {
    const utils = render(<PopUpAddFy
        title={title}
        show={show}
        setShow={setShow}
        onAdd={onAdd}
    />);
    const titleElement = screen.queryByTestId('popup-add-fy-title');
    const nameLabelElement = screen.queryByTestId('popup-add-fy-name-label');
    const nameInputElement = screen.queryByTestId('popup-add-fy-name-input');
    const emailLabelElement = screen.queryByTestId('popup-add-fy-email-label');
    const emailInputElement = screen.queryByTestId('popup-add-fy-email-input');
    const visionsLabelElement = screen.queryByTestId('popup-add-fy-visions-label');
    const visionsInputElement = screen.queryByTestId('popup-add-fy-visions-input');
    return {
        titleElement,
        nameLabelElement,
        nameInputElement,
        emailLabelElement,
        emailInputElement,
        visionsLabelElement,
        visionsInputElement,
        utils
    };
}

test('PopUpAddFy show', async () => {
    const { 
        titleElement,
        nameLabelElement,
        nameInputElement,
        emailLabelElement,
        emailInputElement,
        visionsLabelElement,
        visionsInputElement,
    } = setUp({ show: true });
    await expect(titleElement).toBeInTheDocument();
    await expect(titleElement).toHaveTextContent(defaultTitle);
    await expect(nameLabelElement).toBeInTheDocument();
    await expect(nameInputElement).toBeInTheDocument();
    await expect(emailLabelElement).toBeInTheDocument();
    await expect(emailInputElement).toBeInTheDocument();
    await expect(visionsLabelElement).toBeInTheDocument();
    await expect(visionsInputElement).toBeInTheDocument();
});


test('PopUpAddFy hide', async () => {
    setUp({ show: false });
    await expect(screen.queryByTestId('block-div')).not.toHaveClass('show');
});
/*
test('PopUp click blocker', async () => {
    let show = true;
    const setShow = (val) => show = val;
    const { 
        blockerElement,
    } = setUp({ show, setShow });
    await fireEvent.click(blockerElement);
    await expect(show).toEqual(false);
});
*/