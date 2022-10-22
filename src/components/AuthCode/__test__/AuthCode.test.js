import {render, fireEvent, waitFor, act} from '@testing-library/react';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom';
import { AuthCode } from '..';
import { setUpApi, testStyle } from '../../../lib/testUtil';
import { RESPONSE_STATUS } from '../../../lib/constants';

const email = 'kurt@gmail.com';
const label = 'test label';
const containerClassName = 'test-class';
const containerStyle = {color: 'red', backgroundColor: 'grey'};
const inputValue = 'input';
const authCode = '';

const setUp = ({ email, label, containerClassName, containerStyle, inputValue, authCode, onInputChange, onCodeChange }) => {
    const utils = render(<AuthCode 
        email={email}
        label={label}
        containerClassName={containerClassName}
        containerStyle={containerStyle}
        inputValue={inputValue}
        onInputChange={onInputChange}
        onCodeChange={onCodeChange}
        toast={toast}
    />);
    const containerElement = utils.getByTestId('auth-code-container');
    const labelElement = utils.getByTestId('auth-code-label');
    const inputElement = utils.getByTestId('auth-code-input');
    const buttonElement = utils.getByTestId('auth-code-button');
    return {
        containerElement,
        labelElement,
        inputElement,
        buttonElement,
        utils
    };
}

test('AuthCode component render', async () => {
    const onInputChange = () => {};
    const onCodeChange = () => {};
    const { 
        containerElement,
        labelElement,
        inputElement,
        buttonElement,
     } = setUp({ email, label, containerClassName, containerStyle, inputValue, authCode, onInputChange, onCodeChange });
    await expect(containerElement).toHaveClass(containerClassName);
    await testStyle(containerElement, containerStyle);
    await expect(labelElement).toHaveTextContent(label);
    await expect(inputElement).toHaveValue(inputValue);
    await expect(buttonElement).toHaveTextContent('Send');
});

test('AuthCode component input', async () => {
    const typedInput = 'typed input';
    let input = "";
    const onInputChange = (value) => input = value;
    const onCodeChange = () => {};
    const { 
        inputElement,
     } = setUp({ email, label, containerClassName, containerStyle, inputValue, authCode, onInputChange, onCodeChange });
    await fireEvent.change(inputElement, {target: { value: typedInput }});
    await expect(input).toEqual(typedInput);
});

test('Get verification code success', async () => {
    const serverCode = '123456';
    let code = "";
    const fetchMock = setUpApi(process.env.REACT_APP_HOST_URL + '/sendVerificationEmail', async () => ({ 
        json: () => Promise.resolve({ status: RESPONSE_STATUS.SUCCESS, code: serverCode })
    }));
    const onInputChange = () => {};
    const onCodeChange = (value) => code = value;
    const { 
        buttonElement,
    } = setUp({ email, label, containerClassName, containerStyle, inputValue, authCode, onInputChange, onCodeChange });
    await act(async () => {
        await waitFor(() => fireEvent.click(buttonElement));
    });
    await expect(fetchMock).toHaveBeenCalledWith(process.env.REACT_APP_HOST_URL + '/sendVerificationEmail', expect.anything());
    await expect(code).toEqual(serverCode);
});

test('Get verification code error', async () => {
    const serverCode = '123456';
    let code = "";
    const fetchMock = setUpApi(process.env.REACT_APP_HOST_URL + '/sendVerificationEmail', async () => ({ 
        json: () => Promise.reject({ status: RESPONSE_STATUS.ERROR })
    }));
    const onInputChange = () => {};
    const onCodeChange = (value) => code = value;
    const { 
        buttonElement,
    } = setUp({ email, label, containerClassName, containerStyle, inputValue, authCode, onInputChange, onCodeChange });
    await act(async () => {
        await waitFor(() => fireEvent.click(buttonElement));
    });
    await expect(fetchMock).toHaveBeenCalledWith(process.env.REACT_APP_HOST_URL + '/sendVerificationEmail', expect.anything());
    await expect(code).toEqual('');
});

test('Get verification code error', async () => {
    const serverCode = '123456';
    let code = "";
    const fetchMock = setUpApi(process.env.REACT_APP_HOST_URL + '/sendVerificationEmail', async () => ({ 
        json: () => Promise.resolve({ status: RESPONSE_STATUS.ERROR })
    }));
    const onInputChange = () => {};
    const onCodeChange = (value) => code = value;
    const { 
        buttonElement,
    } = setUp({ email, label, containerClassName, containerStyle, inputValue, authCode, onInputChange, onCodeChange });
    await act(async () => {
        await waitFor(() => fireEvent.click(buttonElement));
    });
    await expect(fetchMock).toHaveBeenCalledWith(process.env.REACT_APP_HOST_URL + '/sendVerificationEmail', expect.anything());
    await expect(code).toEqual('');
});