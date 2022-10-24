import { fireEvent, render, screen, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ColumnSort } from '..';
import { testStyle } from '../../../lib/testUtil';

const defaultOnSort = () => undefined;

const setUp = ({ 
    onSort = defaultOnSort,
 }) => {
    const utils = render(<ColumnSort
        onSort={onSort}
    />);
    const containerElement = utils.queryByTestId('column-sort-container');
    const iconElement = utils.queryByTestId('column-sort-icon');
    return {
        containerElement,
        iconElement,
        utils
    };
}

test('Column sort initial render', async () => {
    const { 
        containerElement,
        iconElement,
    } = setUp({});
    await expect(containerElement).toBeInTheDocument();
    await expect(iconElement).toBeInTheDocument();
});

test('Column sort click icon', async () => {
    let sort = 0;
    const onSort = (value) => sort = value;
    const { 
        iconElement,
    } = setUp({ onSort });
    await fireEvent.click(iconElement);
    await expect(sort).toEqual(1);
    await fireEvent.click(iconElement);
    await expect(sort).toEqual(2);
    await fireEvent.click(iconElement);
    await expect(sort).toEqual(0);
});