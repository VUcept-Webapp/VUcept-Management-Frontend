import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScreenBlocker } from '..';

const setUp = (props) => {
    const utils = render(<ScreenBlocker
        {...props}
    />);
    const screenBlocker = utils.queryByTestId('screen-blocker');
    return {
        screenBlocker,
        utils
    };
}

test('ScreenBlocker show', async () => {
    const { 
        screenBlocker
    } = setUp({ show: true, onClick: () => undefined });
    await expect(screenBlocker).toBeInTheDocument();
    await expect(screenBlocker).toHaveClass('show');
});

test('ScreenBlocker hide', async () => {
    const { 
        screenBlocker
    } = setUp({ show: false, onClick: () => undefined });
    await expect(screenBlocker).toBeInTheDocument();
    await expect(screenBlocker).not.toHaveClass('show');
});