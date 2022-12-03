import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TimePicker } from '..';

const setUp = ({
    className = 'classname',
    time = '13:31',
    readOnly = false
}) => {
    const testRef = { current: '' };
    const utils = render(<TimePicker
        className={className}
        time={time}
        readOnly={readOnly}
        ref={testRef}
    />);
    const picker = utils.queryByTestId('time-picker');
    const h = utils.queryByTestId('time-picker-h');
    const m = utils.queryByTestId('time-picker-m');
    return {
        picker,
        h,
        m,
        utils
    };
}

test('TimePicker render', async () => {
    const { 
        picker,
        h,
        m,
    } = setUp({});
    await expect(picker).toBeInTheDocument();
    await expect(picker).toHaveClass('timePicker classname');
    await expect(h).toBeInTheDocument();
    await expect(h).toHaveValue('13');
    await expect(m).toBeInTheDocument();
    await expect(m).toHaveValue('31');
});