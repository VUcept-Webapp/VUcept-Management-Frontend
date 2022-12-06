import { render, screen } from '@testing-library/react';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom';
import { UserManagement } from '..';
import { AuthContext } from '../../../lib/contexts';

const setUp = () => {
    const utils = render(<AuthContext.Provider value={{token: { accessToken: '1' }}}>
        <UserManagement
            toast={toast}
        />
    </AuthContext.Provider>);
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
});