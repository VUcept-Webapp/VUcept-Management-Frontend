import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TableSelect } from '..';
import { testStyle } from '../../../lib/testUtil';

const setUp = ({
    className = 'classname',
    height = 25,
    options = { label: '1', value: '1' },
    selected = { label: '1', value: '1' },
    onChange = () => undefined,
    warn = false,
    placeholder = 'placeholder',
    isClearable = true,
}) => {
    const utils = render(<TableSelect
        className={className}
        height={height}
        options={options}
        selected={selected}
        onChange={onChange}
        warn={warn}
        placeholder={placeholder}
        isClearable={isClearable}
    />);
    const tableSelect = utils.queryByTestId('table-select');
    return {
        tableSelect,
        utils
    };
}

test('TableSelect render', async () => {
    const { 
        tableSelect
    } = setUp({});
    await expect(tableSelect).toBeInTheDocument();
    await expect(tableSelect).toHaveClass('container classname');
});