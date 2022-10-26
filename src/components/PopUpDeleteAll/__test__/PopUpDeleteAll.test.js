import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PopUpDeleteAll } from '..';

const defaultShow = true;
const defaultTitle = 'title';
const defaultSetShow = () => undefined;
const defaultDescription = 'description';
const defaultOnDelete = () => undefined;

const setUp = ({ 
    show = defaultShow,
    setShow = defaultSetShow,
    title = defaultTitle,
    description = defaultDescription,
    onDelete = defaultOnDelete
}) => {
    const utils = render(<PopUpDeleteAll
        title={title}
        show={show}
        setShow={setShow}
        description={description}
        onDelete={onDelete}
    />);
    const titleElement = utils.queryByTestId('popup-delete-all-title');
    const descriptionElement = utils.queryByTestId('popup-delete-all-description');
    const cancelElement = screen.queryByText('Cancel');
    const clearElement = screen.queryByText('Clear');
    return {
        titleElement,
        descriptionElement,
        cancelElement,
        clearElement,
        utils
    };
}

test('PopUpDeleteAll show', async () => {
    const { 
        titleElement,
        descriptionElement,
        cancelElement,
        clearElement,
    } = setUp({ show: true });
    await expect(titleElement).toBeInTheDocument();
    await expect(descriptionElement).toBeInTheDocument();
    await expect(cancelElement).toBeInTheDocument();
    await expect(clearElement).toBeInTheDocument();
    await expect(titleElement).toHaveTextContent(defaultTitle);
    await expect(descriptionElement).toHaveTextContent(defaultDescription);
});

test('PopUpDeleteAll click clear', async () => {
    let test = 0;
    const onDelete = () => test = 1;
    const { 
        clearElement,
    } = setUp({ onDelete });
    await fireEvent.click(clearElement);
    await expect(test).toEqual(1);
});

test('PopUpDeleteAll click cancel', async () => {
    let test = 0;
    const onDelete = () => test = 1;
    const { 
        cancelElement,
    } = setUp({ onDelete });
    await fireEvent.click(cancelElement);
    await expect(test).toEqual(0);
});

test('PopUpDeleteAll hide', async () => {
    setUp({ show: false });
    await expect(screen.queryByTestId('block-div')).not.toHaveClass('show');
});