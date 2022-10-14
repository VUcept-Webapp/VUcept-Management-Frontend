import { TableItem } from "../components/TableItem";

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
    VERIFICATION_CODE: 'Verification Code'
}

export const RESPONSE_STATUS = {
    SUCCESS: 'SUCCESS',
    INCORRECT_STATUS: 'INCORRECT_STATUS',
    INCORRECT_TYPE: 'INCORRECT_TYPE',
    UNKNOWN_SORT: 'UNKNOWN_SORT',
    EMAIL_USED: 'EMAIL_USED',
    ERROR: 'ERROR',
    INCORRECT_USER_EMAIL: 'INCORRECT_USER_EMAIL',
    INVALID_EMAIl: 'INVALID_EMAIL',
    USER_EXISTENT: 'USER_EXISTENT',
    INVALID_PASSWORD: 'INVALID_PASSWORD',
    REQUEST_SIGN_UP: 'REQUEST_SIGN_UP'
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
    IMPORT: 'Import',
    EXPORT: 'Export',
    RESET: 'Reset',
}

export const TABLE = {
    ROW_PER_PAGE: 50,
    MIN_COLUMN_WIDTH: 150
}

export const LOG_ATTENDANCE_COLUMNS = [
    {
        key: 'name',
        label: 'Name',
        sort: true,
        search: true,
        render: (val) => <TableItem item={val} />
    },
    {
        key: 'email',
        label: 'Email',
        sort: true,
        search: true,
        render: (val) => <TableItem item={val} />
    },
    {
        key: 'attendance',
        label: 'Attendance',
        render: (val) => <TableItem item={val} />
    },
];

export const USER_MANAGEMENT_COLUMNS = [
    {
        key: 'name',
        label: 'Name',
        sort: true,
        search: true,
        render: (val) => <TableItem item={val} />
    },
    {
        key: 'email',
        label: 'Email',
        sort: true,
        search: true,
        render: (val) => <TableItem item={val} />
    },
    {
        key: 'type',
        label: 'Type',
        filter: ['VUCeptor', 'Advisor', 'Board'],
        render: (val) => <TableItem item={val} />
    },
    {
        key: 'visions',
        label: 'Visions',
        // filter: ['Registered', 'Unregistered'],
        render: (val) => <TableItem item={val} />
    },
    {
        key: 'status',
        label: 'Status',
        filter: ['Registered', 'Unregistered'],
        render: (val) => <TableItem item={val} />
    },
];

export const FIRST_YEAR_COLUMNS = [
    {
        key: 'name',
        label: 'Name',
        sort: true,
        search: true,
        render: (val) => <TableItem item={val} />
    },
    {
        key: 'email',
        label: 'Email',
        sort: true,
        search: true,
        render: (val) => <TableItem item={val} />
    },
    {
        key: 'group',
        label: 'Group',
        sort: true,
        render: (val) => <TableItem item={val} />
        // filter: ['VUCeptor', 'Advisor', 'Board']
    },
    {
        key: 'week',
        label: 'Week',
        sort: true,
        render: (val) => <TableItem item={val} />
        // filter: ['Registered', 'Unregistered']
    },
    {
        key: 'status',
        label: 'Status',
        render: (val) => <TableItem item={val} />
        // filter: ['Registered', 'Unregistered']
    },
];

export const USER_TYPE_OPTIONS = [
    { label: 'Advisor', value: 'Advisor' },
    { label: 'Board', value: 'Board' },
    { label: 'VUceptor', value: 'VUceptor' },
];

export const USER_STATUS_OPTIONS = [
    { label: 'Registered', value: 'Registered' },
    { label: 'Unregistered', value: 'Unregistered' },
];

export const ATTENDANCE_STATUS_OPTIONS = [
    { label: 'Present', value: 'Present' },
    { label: 'Excused', value: 'Excused' },
    { label: 'Absent', value: 'Absent' },
    { label: 'Select', value: 'Select' },
];

export const RESPONSE_MESSAGE = {
    VIEW_USER_SUCCESS: 'view user success',
    USER_EDIT_SUCCESS: 'user edited successfully',
    ADD_USER_SUCCESS: 'user created successfully',
    USER_DELETE_SUCCESS: 'user deleted successfully',
}

export const SORT = {
    NO_SORT: 0,
    DESCEND: 2,
    ASCEND: 1,
}

export const LOG_ATTENDANCE_ROWS_TEST = [
    {email: 'awejfoiaw', name: 'hi', attendance: 'Select'},
    {email: 'awejfoiaw', name: 'hi', attendance: 'Excused'},
    {email: 'awejfoiaw', name: 'hi', attendance: 'Absent'},
    {email: 'awejfoiaw', name: 'hi', attendance: 'Present'},
    {email: 'awejfoiaw', name: 'hi', attendance: 'Select'},
    /*{email: 'awejfoiaw', name: 'hi', attendance: 'Select'},
    {email: 'awejfoiaw', name: 'hi', attendance: 'Select'},
    {email: 'awejfoiaw', name: 'hi', attendance: 'Select'},
    {email: 'awejfoiaw', name: 'hi', attendance: 'Select'},
    {email: 'awejfoiaw', name: 'hi', attendance: 'Select'},
    {email: 'awejfoiaw', name: 'hi', attendance: 'Select'},
    {email: 'awejfoiaw', name: 'hi', attendance: 'Select'},
    {email: 'awejfoiaw', name: 'hi', attendance: 'Select'},
    {email: 'awejfoiaw', name: 'hi', attendance: 'Select'},
    {email: 'awejfoiaw', name: 'hi', attendance: 'Select'},
    {email: 'awejfoiaw', name: 'hi', attendance: 'Select'},
    {email: 'awejfoiaw', name: 'hi', attendance: 'Select'},*/
];

export const USER_MANAGEMENT_ROWS_TEST = [
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
    {email: 'awejfoiaw', name: 'hi', type: 'VUceptor', status: 'Registered', visions: '9'},
];

export const FIRST_YEAR_ROWS_TEST = [
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Absent'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Excused'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
    {email: 'awejfoiaw', name: 'hi', group: 1, week: 2, status: 'Attended'},
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