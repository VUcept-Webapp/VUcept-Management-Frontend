import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CalendarComponent } from '..';
import { testStyle } from '../../../lib/testUtil';

const defaultOnDateChange = () => undefined;

const setUp = ({ 
    onDateChange = defaultOnDateChange,
 }) => {
    render(<div id='root'></div>);
    const utils = render(<CalendarComponent onDateChange={onDateChange}/>);
    const containerElement = utils.queryByTestId('calendar-component-container');
    const wrapperElement = screen.queryByTestId('calendar-component-wrapper');
    const imgElement = utils.queryByTestId('calendar-component-img');
    return {
        containerElement,
        wrapperElement,
        imgElement,
        utils
    };
}

test('CalendarComponent initial render', async () => {
    const { 
        containerElement,
        wrapperElement,
        imgElement,
    } = setUp({});
    await expect(containerElement).toBeInTheDocument();
    await expect(wrapperElement).not.toBeInTheDocument();
    await expect(imgElement).toBeInTheDocument();
});

test('CalendarComponent show calendar', async () => {
    const {
        containerElement,
        imgElement,
    } = setUp({});
    await expect(containerElement).toBeInTheDocument();
    await fireEvent.click(imgElement);
    await expect(screen.queryByTestId('calendar-component-wrapper')).toBeInTheDocument();
    await expect(imgElement).toBeInTheDocument();
});