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
    HOME: 'Home',
    LOG_VISIONS_ATTENDANCE: 'Log Visions Attendance',
    VISIONS_ASSIGNMENT_CHANGE: 'Visions Assignment Change',
    FIRST_YEAR_ATTENDANCE: 'First-year Attendance Dashboard',
    VUCEPTOR_ATTENDANCE: 'VUceptor Attendance Dashboard',
    USER_MANAGEMENT: 'User Management',
}

export const ROUTES = {
    DASHBOARD: 'dashBoard',
    USER_MANAGEMENT: '/home/userManagement',
    CALENDAR: '/home/calendar',
    LOG_VISIONS: '/home/logVisions',
    VISION_GROUPING: '/home/visionGrouping',
    FIRST_YEAR_ATTENDANCE: '/home/firstyearAttendance',
    VUCEPTOR_ATTENDANCE: '/home/vuceptorAttendance'
}

export const CAPTIONS = {
    USER_MANAGEMENT: 'User Management',
    LOG_VISIONS_ATTENDANCE: 'Log Visions Attendance',
    FIRST_YEAR_ATTENDANCE: 'First-year Attendance',
    VUCEPTOR_ATTENDANCE: 'VUceptor Attendance',
    HOME: 'Home'
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
        search: true,
    },
    {
        label: 'Email',
        sort: true,
        search: true,
    },
    {
        label: 'Type',
        filter: ['VUCeptor', 'Advisor', 'Board']
    },
    {
        label: 'Status',
        filter: ['Registered', 'Unregistered']
    },
];

export const USER_MANAGEMENT_ROWS_TEST = [
    ['oiajwefoi','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['weajf','awioejf.awefioja@vanderbilt.edu','Board','Registered'],
    ['wglka','awioejf.awefioja@vanderbilt.edu','VUceptor','Unregistered'],
    ['giojw','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['io3jgio','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['awejfio','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['aio4jgio34','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['awkena','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['xchvioijo','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['nwgjknawoig','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['awklvm3rg','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['aweoifja','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['3io4jgoinfdkvc','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['amwnkarv','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['awiojglkrenv','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['woievjoiw','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['mmawknvjkw','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['ofopjogiaijf','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['awonaosnc','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['aweiofjoiawg','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
    ['oiajwfeio','awioejf.awefioja@vanderbilt.edu','Advisor','Registered'],
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