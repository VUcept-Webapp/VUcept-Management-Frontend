import { fireEvent, render, screen, act, within } from '@testing-library/react';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom';
import { UserManagement } from '..';
import { setUpApi } from '../../../lib/testUtil';
import { RESPONSE_STATUS } from '../../../lib/constants';

// render the page
const setUp = () => {
    const utils = render(<UserManagement
        toast={toast}
    />);
    const addUser = screen.queryByText('+ New');
    const importEle = screen.queryByText('Import');
    const reset = screen.queryByText('Reset');
    const table = screen.queryByTestId('table-wrapper');
    return {
        addUser,
        importEle,
        reset,
        table,
        utils,
    };
}

// test rendered elements
test('UserManagement render', async () => {
    const fetchMockReadUser = setUpApi(process.env.REACT_APP_HOST_URL + '/readUser?row_start=0&row_num=50', async () => ({ 
        json: () => Promise.resolve({ 
            status: RESPONSE_STATUS.SUCCESS,
            result: {
                pages: 1,
                rows: [
                    { email: 'email1@gmail.com', name: 'name1', status: 'unregistered', type: 'advisor', visions: 0 },
                    { email: 'email2@gmail.com', name: 'name2', status: 'registered', type: 'board', visions: 0 },
                ]
            }
        })
    }));
    const {
        addUser,
        importEle,
        reset,
        table,
    } = setUp();
    await expect(addUser).toBeInTheDocument();
    await expect(importEle).toBeInTheDocument();
    await expect(reset).toBeInTheDocument();
    await expect(table).toBeInTheDocument();
    await act(async () => {
        await expect(fetchMockReadUser).toHaveBeenCalledWith(process.env.REACT_APP_HOST_URL + '/readUser?row_start=0&row_num=50', expect.anything());
    });
    await expect(screen.queryByText('email1@gmail.com')).toBeInTheDocument();
    await expect(screen.queryByText('name1')).toBeInTheDocument();
    await expect(screen.queryByText('Unregistered')).toBeInTheDocument();
    await expect(screen.queryByText('Advisor')).toBeInTheDocument();
    await expect(screen.queryByText('email2@gmail.com')).toBeInTheDocument();
    await expect(screen.queryByText('name2')).toBeInTheDocument();
    await expect(screen.queryByText('Registered')).toBeInTheDocument();
    await expect(screen.queryByText('Board')).toBeInTheDocument();
});

// test /visionsNums API
test('UserManagement visions numbers', async () => {
    const fetchMockVisionsNums = setUpApi(process.env.REACT_APP_HOST_URL + '/visionsNums', async () => ({ 
        json: () => Promise.resolve({ 
            status: RESPONSE_STATUS.SUCCESS,
            result: {
                list: [
                    {visions: 0},
                    {visions: 1},
                ]
            }
        })
    }));
    setUp();
    await act(async () => {
        await expect(fetchMockVisionsNums).toHaveBeenCalledWith(process.env.REACT_APP_HOST_URL + '/visionsNums', expect.anything());
    });
    const visionsFilter = await within(screen.queryByText('Visions').parentElement).queryByTestId('column-filter-container');
    await expect(visionsFilter).toBeInTheDocument();
    await fireEvent.click(visionsFilter);
    await expect(screen.getByText('1')).toBeInTheDocument();
});

// test add user pop-up
test('UserManagement click addUser', async () => {
    const { addUser } = setUp();
    await fireEvent.click(addUser);
    await expect(screen.queryByText('Add User')).toBeInTheDocument();
});

// test reset pop-up
test('UserManagement click reset', async () => {
    const { reset } = setUp();
    await fireEvent.click(reset);
    await expect(screen.queryByText('Are you sure you want to clear the whole system?')).toBeInTheDocument();
});