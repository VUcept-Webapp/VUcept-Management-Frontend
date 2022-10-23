import { fireEvent, render, screen, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ColumnSearch } from '..';
import { testStyle } from '../../../lib/testUtil';
import { act } from 'react-dom/test-utils';

const defaultSearchValue = '';
const defaultOnChange = () => undefined;
const defaultOnSearch = () => undefined;

const setUp = ({ 
    searchValue = defaultSearchValue,
    onChange = defaultOnChange,
    onSearch = defaultOnSearch
 }) => {
    render(<div id='root'></div>)
    const utils = render(<ColumnSearch
        searchValue={searchValue}
        onChange={onChange}
        onSearch={onSearch}
    />);
    const containerElement = utils.queryByTestId('column-search-container');
    const iconElement = utils.queryByTestId('column-search-icon');
    const inputElement = screen.queryByTestId('column-search-input');
    return {
        containerElement,
        iconElement,
        inputElement,
        utils
    };
}

test('Column search initial render', async () => {
    const { 
        containerElement,
        iconElement,
        inputElement,
    } = setUp({});
    await expect(containerElement).toBeInTheDocument();
    await expect(iconElement).toBeInTheDocument();
    await expect(inputElement).not.toBeInTheDocument();
});

test('Column search click icon', async () => {
    const { 
        iconElement,
        inputElement,
    } = setUp({});
    await expect(inputElement).not.toBeInTheDocument();
    await fireEvent.click(iconElement);
    let newInput = screen.queryByTestId('column-search-input');
    await expect(newInput).toBeInTheDocument();
});

test('Column search type input', async () => {
    const typedInput = 'typed input';
    let input = "", search = "";
    const onChange = (value) => input = value; 
    const onSearch = (value) => search = value;
    const { 
        iconElement,
    } = setUp({ onChange, onSearch });

    await fireEvent.click(iconElement);
    let inputElement = screen.queryByTestId('column-search-input');
    await expect(inputElement).toBeInTheDocument();
    await act(async () => {
        await fireEvent.change(inputElement, {target: { value: typedInput }});
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
    await expect(input).toEqual(typedInput);
    await expect(search).toEqual(typedInput);
});
