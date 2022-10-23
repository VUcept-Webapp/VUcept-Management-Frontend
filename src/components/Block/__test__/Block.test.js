import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Block } from '..';
import { testStyle } from '../../../lib/testUtil';

const defaultClassName = 'classname';
const defaultStyle = { color: 'red', backgroundColor: 'grey' };
const defaultChildren = [
    <span data-testid='child-1'>child1</span>,
    <span data-testid='child-2'>child2</span>,
]

const setUp = ({ 
    className = defaultClassName,
    style = defaultStyle,
    children = defaultChildren
 }) => {
    const utils = render(<Block 
        className={className}
        style={style}
        children={children}
    />);
    const divElement = utils.getByTestId('block-div');
    return {
        divElement,
        utils
    };
}

test('Block component render', async () => {
    const { 
        divElement,
    } = setUp({});
    await expect(divElement).toHaveClass(defaultClassName);
    await testStyle(divElement, defaultStyle);
});

test('Block component children', async () => {
    const { 
        divElement,
    } = setUp({});
    await expect(screen.getByTestId('child-1')).toHaveTextContent('child1');
    await expect(screen.getByTestId('child-2')).toHaveTextContent('child2');
});