import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TableButton } from '..';
import { testStyle } from '../../../lib/testUtil';

const setUp = ({
    className = 'classname',
    style = { color: 'red' },
    label = 'label',
    onClick = () => undefined,
}) => {
    const utils = render(<TableButton
        className={className}
        style={style}
        label={label}
        onClick={onClick}
    />);
    const tableButton = utils.queryByTestId('table-button');
    return {
        tableButton,
        utils
    };
}

test('TableButton render', async () => {
    const { 
        tableButton
    } = setUp({});
    await expect(tableButton).toBeInTheDocument();
    await expect(tableButton).toHaveClass('button classname');
    await testStyle(tableButton, { color: 'red' });
    await expect(tableButton).toHaveTextContent('label');
});