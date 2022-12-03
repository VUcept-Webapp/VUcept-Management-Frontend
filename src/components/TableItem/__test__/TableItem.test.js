import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TableItem } from '..';
import { testStyle } from '../../../lib/testUtil';

const setUp = ({
    className = 'classname',
    style = { color: 'red' },
    item = 'item',
}) => {
    const utils = render(<TableItem
        className={className}
        style={style}
        item={item}
    />);
    const tableItem = utils.queryByTestId('table-item');
    return {
        tableItem,
        utils
    };
}

test('TableItem render', async () => {
    const { 
        tableItem
    } = setUp({});
    await expect(tableItem).toBeInTheDocument();
    await expect(tableItem).toHaveClass('classname');
    await testStyle(tableItem, { color: 'red' });
    await expect(tableItem).toHaveTextContent('item');
});