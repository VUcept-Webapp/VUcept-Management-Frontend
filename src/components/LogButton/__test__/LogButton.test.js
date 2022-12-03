import { fireEvent, render, screen, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LogButton } from '..';
import { testStyle } from '../../../lib/testUtil';

const setUp = (props) => {
    const utils = render(<LogButton
        {...props}
    />);
    const logButton = utils.queryByTestId('log-button');
    return {
        logButton,
        utils
    };
}

test('LogButton render', async () => {
    const { 
        logButton
    } = setUp({ val: 'test', rowI: 1});
    await expect(logButton).toBeInTheDocument();
});