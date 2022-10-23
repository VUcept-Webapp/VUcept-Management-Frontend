import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlockBlocker } from '..';
import { testStyle } from '../../../lib/testUtil';

const defaultClassName = 'classname';
const defaultStyle = { color: 'red', backgroundColor: 'grey' };
const defaultShow = true;

const setUp = ({ 
    className = defaultClassName,
    style = defaultStyle,
    show = defaultShow
 }) => {
    const utils = render(<BlockBlocker 
        className={className}
        style={style}
        show={show}
    />);
    const divElement = utils.queryByTestId('block-blocker-div');
    const imgElement = utils.queryByTestId('block-blocker-img');
    return {
        divElement,
        imgElement,
        utils
    };
}

test('BlockBlocker component render', async () => {
    const { 
        divElement,
        imgElement,
    } = setUp({});
    await expect(divElement).toHaveClass(defaultClassName);
    await testStyle(divElement, defaultStyle);
    await expect(imgElement).toBeInTheDocument();
});

test('BlockBlocker component hidden', async () => {
    const { 
        divElement,
        imgElement,
    } = setUp({ show: false });
    await expect(divElement).not.toBeInTheDocument();
    await expect(imgElement).not.toBeInTheDocument();
});