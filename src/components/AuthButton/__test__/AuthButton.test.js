import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AuthButton } from '..';
import { testStyle } from '../../../lib/testUtil';

const label = 'test-label';
const className = 'test-class';
const style = {color: 'red', backgroundColor: 'grey'};

const setUp = ({ style, className, label, onClick }) => {
    const utils = render(<AuthButton 
        className={className}
        style={style}
        label={label}
        onClick={onClick}
    />);
    const div = utils.getByTestId('auth-button-div');
    return {
        div,
        utils
    };
}

test('AuthButton component render', async () => {
    const onClick = () => {};
    const {
        div,
        utils
    } = setUp({ style, className, label, onClick });
    await expect(div).toHaveClass(className);
    testStyle(div, style);
    await expect(div).toHaveTextContent(label);
    await userEvent.click(div);
});

test('AuthButton component onClick', async () => {
    let testClick = 0;
    const onClick = () => testClick++;
    const {
        div,
        utils
    } = setUp({ style, className, label, onClick });
    await userEvent.click(div);
    await expect(testClick).toEqual(1);
});