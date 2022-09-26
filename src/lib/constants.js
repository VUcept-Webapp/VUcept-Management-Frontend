export const WINDOW_TYPE = {
    WEB: 'WEB',
    MOBILE: 'MOBILE'
};

export const AUTH_INPUT_LABELS = {
    EMAIL: 'Email',
    PASSWORD: 'Password',
    LOG_IN: 'Log In',
    SIGN_UP: 'Sign Up',
    CREATE_ACCOUNT: 'Create Account',
    FORGOT_PASSWORD: 'Forgot Password',
    CONFIRM_PASSWORD: 'Confirm Password',
    RESET_PASSWORD: 'Enter email to reset password',
    SEND_EMAIL: 'Send Email',
}

export const AUTH_INPUT_ERRORS = {
    EMAIL: 'Email',    
}

export const HOME_NAV_LABELS = {
    DASHBOARD: 'Dashboard',
    USER_MANAGEMENT: 'User Management'
}

export const ROUTES = {
    DASHBOARD: 'dashBoard',
    USER_MANAGEMENT: 'userManagement'
}

export const CAPTIONS = {
    USER_MANAGEMENT: 'User Management'
}

export const BUTTONS = {
    NEW_USER: '+ New User',
    IMPORT: 'Import'
}

export const TABLE = {
    ROW_PER_PAGE: 50
}

export const USER_MANAGEMENT_COLUMNS = [
    {
        label: 'Name',
        sort: true,
    },
    {
        label: 'Email',
        sort: true,
    },
    {
        label: 'User Type',
        sort: true,
    },
    {
        label: 'Status',
        sort: true,
    },
    {
        label: 'Operation',
        sort: true,
    }
];

/*

columns: [{
        label,
        sort
        filter: [{label, value}]
        className,
        style
    }]
*/