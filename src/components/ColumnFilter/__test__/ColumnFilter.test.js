import { fireEvent, render, screen, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ColumnFilter } from '..';
import { testStyle } from '../../../lib/testUtil';

const defaultOptions = ['option1', 'option2', 'option3'];
const defaultOnFilter = () => undefined;

const setUp = ({ 
    options = defaultOptions,
    onFilter = defaultOnFilter,
 }) => {
    render(<div id='root'></div>)
    const utils = render(<ColumnFilter
        options={options}
        onFilter={onFilter}
    />);
    const containerElement = utils.queryByTestId('column-filter-container');
    const iconElement = utils.queryByTestId('column-filter-img');
    const selectWrapperElement = screen.queryByTestId('column-filter-select-wrapper');
    return {
        containerElement,
        iconElement,
        selectWrapperElement,
        utils
    };
}

test('Column filter initial render', async () => {
    const { 
        containerElement,
        iconElement,
        selectWrapperElement,
    } = setUp({});
    await expect(containerElement).toBeInTheDocument();
    await expect(iconElement).toBeInTheDocument();
    await expect(selectWrapperElement).not.toBeInTheDocument();
});

test('Column filter click icon', async () => {
    const { 
        iconElement,
        selectWrapperElement,
    } = setUp({});
    await expect(selectWrapperElement).not.toBeInTheDocument();
    await fireEvent.click(iconElement);
    const wrapperElement = screen.queryByTestId('column-filter-select-wrapper');
    await expect(wrapperElement).toBeInTheDocument();
});

test('Column filter select options', async () => {
    let filterValues = [];
    const onFilter = (options) => filterValues = options.map(option => option.value);
    const { 
        iconElement,
    } = setUp({ onFilter });

    await fireEvent.click(iconElement);
    let wrapperElement = await screen.queryByTestId('column-filter-select-wrapper');
    await fireEvent.keyDown(wrapperElement.firstChild, { key: 'ArrowDown' });
    // await waitForElement(() => screen.getByText('option1'));
    await fireEvent.click(screen.getByText('option1'));
    await expect(filterValues).toEqual(['option1']);

    await fireEvent.click(iconElement);
    wrapperElement = await screen.queryByTestId('column-filter-select-wrapper');
    await fireEvent.keyDown(wrapperElement.firstChild, { key: 'ArrowDown' });
    await fireEvent.click(screen.getByText('option2'));
    await expect(filterValues).toEqual(['option1', 'option2']);

    await fireEvent.click(iconElement);
    wrapperElement = await screen.queryByTestId('column-filter-select-wrapper');
    await fireEvent.keyDown(wrapperElement.firstChild, { key: 'ArrowDown' });
    await fireEvent.click(screen.getByText('option1'));
    // await expect(filterValues).toEqual(['option2']);
});