import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PopUp } from '..';
import { testStyle } from '../../../lib/testUtil';
import { act } from 'react-dom/test-utils';

const defaultClassName = 'class';
const defaultStyle = { color: 'red', backgroundColor: 'grey' };
const defaultShow = false;
const defaultSetShow = () => undefined;
const defaultChildren = [<span data-testid='child1'>child1</span>, <span data-testid='child2'>child2</span>];

const setUp = ({ 
    className = defaultClassName,
    style = defaultStyle,
    show = defaultShow,
    setShow = defaultSetShow,
    children = defaultChildren,
}) => {
    const utils = render(<PopUp
        className={className}
        style={style}
        show={show}
        setShow={setShow}
        children={children}
    />);
    const blockerElement = screen.queryByTestId('pop-up-blocker');
    const divElement = screen.queryByTestId('block-div');
    return {
        blockerElement,
        divElement,
        utils
    };
}

test('PopUp show', async () => {
    const { 
        blockerElement,
        divElement,
        utils,
    } = setUp({ show: true });
    await expect(blockerElement).toBeInTheDocument();
    await expect(divElement).toBeInTheDocument();
    await expect(divElement).toHaveClass(defaultClassName);
    await testStyle(divElement, defaultStyle);
    await expect(utils.queryByTestId('child1')).toBeInTheDocument();
    await expect(utils.queryByTestId('child1')).toBeInTheDocument();
});

test('PopUp hide', async () => {
    const { 
        blockerElement,
        divElement,
    } = setUp({ show: false });
    await expect(blockerElement).not.toHaveClass('show');
    await expect(divElement).not.toHaveClass('show');
});

test('PopUp click blocker', async () => {
    let show = true;
    const setShow = (val) => show = val;
    const { 
        blockerElement,
    } = setUp({ show, setShow });
    await fireEvent.click(blockerElement);
    await expect(show).toEqual(false);
});