import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PopUpAddUser } from '..';

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
    const utils = render(<PopUpAddUser
        title={title}
        show={show}
        setShow={setShow}
        onAdd={onAdd}
    />);
    const nameLabelElement = screen.queryByTestId('popup-add-user-name-label');
    const nameInputElement = screen.queryByTestId('popup-add-user-name-input');
    const emailLabelElement = screen.queryByTestId('popup-add-user-email-label');
    const emailInputElement = screen.queryByTestId('popup-add-user-email-input');
    const typeLabelElement = screen.queryByTestId('popup-add-user-type-label');
    const typeWrapperElement = screen.queryByTestId('popup-add-user-type-wrapper');
    const visionsLabelElement = screen.queryByTestId('popup-add-user-visions-label');
    const visionsInputElement = screen.queryByTestId('popup-add-user-visions-input');
    const cancelElement = screen.queryByText('Cancel');
    const addElement = screen.queryByText('Add');
    return {
        nameLabelElement,
        nameInputElement,
        emailLabelElement,
        emailInputElement,
        visionsLabelElement,
        visionsInputElement,
        typeLabelElement,
        typeWrapperElement,
        cancelElement,
        addElement,
        utils
    };
}

test('PopUpAddUser show', async () => {
    const { 
        nameLabelElement,
        nameInputElement,
        emailLabelElement,
        emailInputElement,
        typeLabelElement,
        typeWrapperElement,
        visionsLabelElement,
        visionsInputElement,
        cancelElement,
        addElement,
    } = setUp({ show: true });
    await expect(nameLabelElement).toBeInTheDocument();
    await expect(nameInputElement).toBeInTheDocument();
    await expect(emailLabelElement).toBeInTheDocument();
    await expect(emailInputElement).toBeInTheDocument();
    await expect(typeLabelElement).toBeInTheDocument();
    await expect(typeWrapperElement).toBeInTheDocument();
    await expect(visionsLabelElement).not.toBeInTheDocument();
    await expect(visionsInputElement).not.toBeInTheDocument();
    await expect(cancelElement).toBeInTheDocument();
    await expect(addElement).toBeInTheDocument();
});

test('PopUpAddUser hide', async () => {
    setUp({ show: false });
    await expect(screen.queryByTestId('block-div')).not.toHaveClass('show');
});

test('PopUpAddUser VUceptor type', async () => {
    setUp({ show: true });
    await fireEvent.keyDown(screen.getByText('Select...'), { key: 'ArrowDown' });
    await fireEvent.click(screen.getByText('VUceptor'));
    await expect(screen.queryByTestId('popup-add-user-visions-label')).toBeInTheDocument();
    await expect(screen.queryByTestId('popup-add-user-visions-input')).toBeInTheDocument();
});

test('PopUpAddUser type Board', async () => {
    setUp({ show: true });
    await fireEvent.keyDown(screen.getByText('Select...'), { key: 'ArrowDown' });
    await fireEvent.click(screen.getByText('VUceptor'));
    await fireEvent.keyDown(screen.getByText('VUceptor'), { key: 'ArrowDown' });
    await fireEvent.click(screen.getByText('Board'));
    await expect(screen.queryByTestId('popup-add-user-visions-label')).not.toBeInTheDocument();
    await expect(screen.queryByTestId('popup-add-user-visions-input')).not.toBeInTheDocument();
});

test('PopUpAddUser onAdd', async () => {
    const nameVal = 'name', emailVal = 'email', visionsVal = '1', typeVal = 'vuceptor';
    let name = '', email = '', visions = '', type = '';
    const onAdd = ({ inputName, inputEmail, inputType, inputVisions }) => {
        name = inputName;
        email = inputEmail;
        visions = inputVisions;
        type = inputType;
    }
    const {
        nameInputElement,
        emailInputElement,
        addElement
    } = setUp({ onAdd });
    await fireEvent.keyDown(screen.getByText('Select...'), { key: 'ArrowDown' });
    await fireEvent.click(screen.getByText('VUceptor'));
    await fireEvent.change(screen.queryByTestId('popup-add-user-visions-input'), { target: { value: visionsVal } });
    await fireEvent.change(nameInputElement, { target: { value: nameVal } });
    await fireEvent.change(emailInputElement, { target: { value: emailVal } });
    await fireEvent.click(addElement);
    await expect(name).toEqual(nameVal);
    await expect(email).toEqual(emailVal);
    await expect(visions.toString()).toEqual(visionsVal);
    await expect(type).toEqual(typeVal);
});

test('PopUpAddUser cancel', async () => {
    const nameVal = 'name', emailVal = 'email', visionsVal = '1', typeVal = 'vuceptor';
    let name = '', email = '', visions = '', type = '';
    const onAdd = ({ inputName, inputEmail, inputType, inputVisions }) => {
        name = inputName;
        email = inputEmail;
        visions = inputVisions;
        type = inputType;
    };
    const {
        nameInputElement,
        emailInputElement,
        cancelElement,
        utils
    } = setUp({ onAdd });
    await fireEvent.keyDown(screen.getByText('Select...'), { key: 'ArrowDown' });
    await fireEvent.click(screen.getByText('VUceptor'));
    await fireEvent.change(screen.queryByTestId('popup-add-user-visions-input'), { target: { value: visionsVal } });
    await fireEvent.change(nameInputElement, { target: { value: nameVal } });
    await fireEvent.change(emailInputElement, { target: { value: emailVal } });
    await fireEvent.click(cancelElement);
    await expect(name).toEqual('');
    await expect(email).toEqual('');
    await expect(visions.toString()).toEqual('');
    await expect(type).toEqual('');
});