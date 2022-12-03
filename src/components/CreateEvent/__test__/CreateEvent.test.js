import { fireEvent, render, screen, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CreateEvent } from '..';
import { testStyle } from '../../../lib/testUtil';

const defaultSetShowPopUp = () => undefined;
const defaultDate = '2022-12-03';
const defaultStartTime = '03:00';
const defaultGetEvents = () => undefined;
const defaultVision = 1;

const setUp = ({ 
    setShowPopUp = defaultSetShowPopUp,
    date = defaultDate,
    startTime = defaultStartTime,
    getEvents = defaultGetEvents,
    vision = defaultVision
}) => {
    const utils = render(<CreateEvent
        setShowPopUp={setShowPopUp}
        date={date}
        startTime={startTime}
        getEvents={getEvents}
        vision={vision}
    />);
    const eventType = utils.queryByTestId('create-event-type');
    const eventTitle = utils.queryByTestId('create-event-title');
    const eventLocation = utils.queryByTestId('create-event-location');
    const eventDate = utils.queryByTestId('create-event-date');
    const eventTime = utils.queryByTestId('create-event-time');
    const eventDescription = utils.queryByTestId('create-event-description');
    return {
        eventType,
        eventTitle,
        eventLocation,
        eventDate,
        eventTime,
        eventDescription,
        utils
    };
}

test('CreateEvent render', async () => {
    const { 
        eventType,
        eventTitle,
        eventLocation,
        eventDate,
        eventTime,
        eventDescription,
    } = setUp({});
    await expect(eventType).toBeInTheDocument();
    await expect(eventTitle).toBeInTheDocument();
    await expect(eventLocation).toBeInTheDocument();
    await expect(eventDate).toBeInTheDocument();
    await expect(eventTime).toBeInTheDocument();
    await expect(eventDescription).toBeInTheDocument();
});