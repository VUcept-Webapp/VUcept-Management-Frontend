import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Caption } from '..';
import { testStyle } from '../../../lib/testUtil';

const defaultText = 'label';
const defaultClassName = 'class';
const defaultStyle = { color: 'red', backgroundColor: 'grey' };

const setUp = ({ 
    text = defaultText,
    className = defaultClassName,
    style = defaultStyle
 }) => {
    const utils = render(<Caption
        text={text}
        className={className}
        style={style}
    />);
    const divElement = utils.queryByTestId('caption-div');
    return {
        divElement,
        utils
    };
}

test('Caption render', async () => {
    const { 
        divElement
    } = setUp({});
    await expect(divElement).toBeInTheDocument();
    await expect(divElement).toHaveClass(defaultClassName);
    await testStyle(divElement, defaultStyle);
    await expect(divElement).toHaveTextContent(defaultText);
});