import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PopUpDeleteRow } from '..';

const defaultRow = { email: '1', name: '2' };
const defaultTitle = 'title';
const defaultShow = true;
const defaultSetShow = () => undefined;
const defaultDescription = 'description';
const defaultOnDelete = () => undefined;

const setUp = ({ 
    row = defaultRow,
    show = defaultShow,
    setShow = defaultSetShow,
    title = defaultTitle,
    description = defaultDescription,
    onDelete = defaultOnDelete
}) => {
    const utils = render(<PopUpDeleteRow
        row={row}
        show={show}
        setShow={setShow}
        title={title}
        description={description}
        onDelete={onDelete}
    />);
    const titleElement = screen.queryByTestId('popup-delete-row-title');
    const descriptionElement = utils.queryByTestId('popup-delete-row-description');
    const nameElement = utils.queryByTestId('popup-delete-row-name');
    const cancelElement = screen.queryByText('Cancel');
    const removeElement = screen.queryByText('Remove');
    return {
        titleElement,
        descriptionElement,
        nameElement,
        cancelElement,
        removeElement,
        utils
    };
}

test('PopUpDeleteRow show', async () => {
    const { 
        titleElement,
        descriptionElement,
        nameElement,
        cancelElement,
        removeElement,
    } = setUp({ show: true });
    await expect(titleElement).toBeInTheDocument();
    await expect(titleElement).toHaveTextContent(defaultTitle);
    await expect(descriptionElement).toBeInTheDocument();
    await expect(descriptionElement).toHaveTextContent(defaultDescription);
    await expect(nameElement).toBeInTheDocument();
    await expect(nameElement).toHaveTextContent('2');
    await expect(cancelElement).toBeInTheDocument();
    await expect(removeElement).toBeInTheDocument();
});


test('PopUpDeleteRow hide', async () => {
    setUp({ show: false });
    await expect(screen.queryByTestId('block-div')).not.toHaveClass('show');
});

test('PopUpDeleteAll click remove', async () => {
    let test = 0;
    const onDelete = () => test = 1;
    const { 
        removeElement,
    } = setUp({ onDelete });
    await fireEvent.click(removeElement);
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