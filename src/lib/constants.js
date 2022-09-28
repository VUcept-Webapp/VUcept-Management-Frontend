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
    ROW_PER_PAGE: 50,
    MIN_COLUMN_WIDTH: 150
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
        label: 'Type',
        filter: ['VUCeptor', 'Advisor', 'Board']
    },
    {
        label: 'Status',
        sort: true,
        filter: ['Registered', 'Unregistered']
    },
];

export const USER_MANAGEMENT_ROWS_TEST = [
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Board','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','VUceptor','Unregistered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
]

/*

columns: [{
        label,
        sort
        filter: [{label, value}]
        className,
        style
    }]
*/