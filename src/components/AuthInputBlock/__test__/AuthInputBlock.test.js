import {render, fireEvent, waitFor, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthInputBlock } from '..';
import { testStyle } from '../../../lib/testUtil';

const defaultLabel = 'test label';
const defaultContainerClassName = 'test-class';
const defaultContainerStyle = {color: 'red', backgroundColor: 'grey'};
const defaultValue = 'default value';
const defaultOnChange = () => undefined;

const setUp = ({ 
    label = defaultLabel, 
    containerClassName = defaultContainerClassName,
    containerStyle = defaultContainerStyle, 
    inputValue = defaultValue,
    onChange = defaultOnChange
 }) => {
    const utils = render(<AuthInputBlock 
        label={label}
        containerClassName={containerClassName}
        containerStyle={containerStyle}
        value={inputValue}
        onChange={onChange}
    />);
    const containerElement = utils.getByTestId('auth-input-container');
    const labelElement = utils.getByTestId('auth-input-label');
    const inputElement= utils.getByTestId('auth-input-input');
    return {
        containerElement,
        labelElement,
        inputElement,
        utils
    };
}

test('AuthInputBlock component render', async () => {
    const { 
        containerElement,
        labelElement,
        inputElement,
     } = setUp({});
    await expect(containerElement).toHaveClass(defaultContainerClassName);
    await testStyle(containerElement, defaultContainerStyle);
    await expect(labelElement).toHaveTextContent(defaultLabel);
    await expect(inputElement).toHaveValue(defaultValue);
});

test('AuthInputBlock component input', async () => {
    const typedInput = 'typed input';
    let input = "";
    const onChange = (value) => input = value;
    const { 
        inputElement,
     } = setUp({ onChange });
    await fireEvent.change(inputElement, {target: { value: typedInput }});
    await expect(input).toEqual(typedInput);
});

test('AuthInputBlock component update value', async () => {
    const newValue = 'new input';
    const { 
        inputElement,
        utils
     } = setUp({});
    await utils.rerender(<AuthInputBlock value={newValue} label={defaultLabel} onChange={defaultOnChange}/>)
    await expect(inputElement).toHaveValue(newValue);
});