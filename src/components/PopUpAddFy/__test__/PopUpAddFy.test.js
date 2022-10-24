import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PopUpAddFy } from '..';

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
    const cancelElement = screen.queryByText('Cancel');
    const addElement = screen.queryByText('Add');
    return {
        titleElement,
        nameLabelElement,
        nameInputElement,
        emailLabelElement,
        emailInputElement,
        visionsLabelElement,
        visionsInputElement,
        cancelElement,
        addElement,
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
        cancelElement,
        addElement,
    } = setUp({ show: true });
    await expect(titleElement).toBeInTheDocument();
    await expect(titleElement).toHaveTextContent(defaultTitle);
    await expect(nameLabelElement).toBeInTheDocument();
    await expect(nameInputElement).toBeInTheDocument();
    await expect(emailLabelElement).toBeInTheDocument();
    await expect(emailInputElement).toBeInTheDocument();
    await expect(visionsLabelElement).toBeInTheDocument();
    await expect(visionsInputElement).toBeInTheDocument();
    await expect(cancelElement).toBeInTheDocument();
    await expect(addElement).toBeInTheDocument();
});


test('PopUpAddFy hide', async () => {
    setUp({ show: false });
    await expect(screen.queryByTestId('block-div')).not.toHaveClass('show');
});

test('PopUpAddFy onAdd', async () => {
    const nameVal = 'name', emailVal = 'email', visionsVal = '1';
    let name = '', email = '', visions = '';
    const onAdd = ({ inputName, inputEmail, inputVisions }) => {
        name = inputName;
        email = inputEmail;
        visions = inputVisions;
    }
    const { 
        nameInputElement,
        emailInputElement,
        visionsInputElement,
        addElement,
    } = setUp({ onAdd });
    await fireEvent.change(nameInputElement, { target: { value: nameVal } });
    await fireEvent.change(emailInputElement, { target: { value: emailVal } });
    await fireEvent.change(visionsInputElement, { target: { value: visionsVal } });
    await fireEvent.click(addElement);
    await expect(name).toEqual(nameVal);
    await expect(email).toEqual(emailVal);
    await expect(visions.toString()).toEqual(visionsVal);
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