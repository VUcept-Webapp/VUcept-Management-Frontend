// Different types of window
export const WINDOW_TYPE = {
    WEB: 'WEB',
    MOBILE: 'MOBILE'
};

// Labels for authentication
export const AUTH_INPUT_LABELS = {
    EMAIL: 'Email',
    NEW_PASSWORD: 'New Password',
    PASSWORD: 'Password',
    LOG_IN: 'Log In',
    SIGN_UP: 'Sign Up',
    CREATE_ACCOUNT: 'Create Account',
    FORGOT_PASSWORD: 'Forgot Password',
    CONFIRM_PASSWORD: 'Confirm Password',
    RESET_PASSWORD: 'Reset',
    SEND_EMAIL: 'Send Email',
    VERIFICATION_CODE: 'Verification Code'
}

// Different status codes
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
    REQUEST_SIGN_UP: 'REQUEST_SIGN_UP',
    INCORRECT_USER_EMAIL: 'INCORRECT_USER_EMAIL',
    REQUEST_SIGN_UP: 'REQUEST_SIGN_UP',
    INCORRECT_FY_VISIONS: 'INCORRECT_FY_VISIONS',
    INCORRECT_FY_NAME: 'INCORRECT_FY_NAME',
    INCORRECT_FY_EMAIL: 'INCORRECT_FY_EMAIL',
    INCORRECT_FY_VISIONS: 'INCORRECT_FY_VISIONS',
    UNKNOWN_SORT: 'UNKNOWN_SORT',
    ROW_OUT_OF_BOUNDS: 'ROW_OUT_OF_BOUNDS',
    INVALID_VU_EVENT: 'INVALID_VU_EVENT',
    NO_EXISTING_RECORDS: 'NO_EXISTING_RECORDS',
    INVALID_USER: 'INVALID_USER',
}

export const AUTH_INPUT_ERRORS = {
    EMAIL: 'Email',    
}

// Labels for left nav bar
export const HOME_NAV_LABELS = {
    HOME: 'Home',
    LOG_VISIONS_ATTENDANCE: 'Log Visions Attendance',
    VISIONS_ASSIGNMENT: 'Visions Assignment',
    FIRST_YEAR_ATTENDANCE: 'First-year Attendance Dashboard',
    VUCEPTOR_ATTENDANCE: 'VUceptor Attendance Dashboard',
    USER_MANAGEMENT: 'User Management',
}

// routes
export const ROUTES = {
    DASHBOARD: 'dashBoard',
    USER_MANAGEMENT: '/home/userManagement',
    CALENDAR: '/home/calendar',
    LOG_VISIONS: '/home/logVisions',
    VISIONS_ASSIGNMENT: '/home/visionsAssignment',
    FIRST_YEAR_ATTENDANCE: '/home/firstyearAttendance',
    VUCEPTOR_ATTENDANCE: '/home/vuceptorAttendance'
}

// captions
export const CAPTIONS = {
    USER_MANAGEMENT: 'User Management',
    LOG_VISIONS_ATTENDANCE: 'Log Visions Attendance',
    FIRST_YEAR_ATTENDANCE: 'First-year Attendance',
    VUCEPTOR_ATTENDANCE: 'VUceptor Attendance',
    HOME: 'Home',
    VISIONS_ASSIGNMENT: 'Visions Assignment',
}

// Texts of buttons
export const BUTTONS = {
    NEW_USER: '+ New User',
    NEW_FIRST_YEAR: 'New First Year',
    IMPORT: 'Import',
    EXPORT: 'Export',
    RESET: 'Reset',
}

// Table metadata
export const TABLE = {
    ROW_PER_PAGE: 50,
    MIN_COLUMN_WIDTH: 170
}

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
    { label: 'Attended', value: 'Attended' },
    { label: 'Unlogged', value: 'Unlogged' },
    { label: 'Absent', value: 'Absent' },
    { label: 'Select', value: 'Select' },
];

export const EDIT_ATTENDANCE_STATUS_OPTIONS = [
    { label: 'Present', value: 'Present' },
    { label: 'Excused', value: 'Excused' },
    { label: 'Absent', value: 'Absent' },
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

export const EVENT = {
    POPUP_WIDTH: 380,
    ATTENDANCE_LABEL: 'Attendance',
    ATTENDANCE_FEEDBACK: 'Feedback',
    SUBMIT: 'Submit',
    DELETE: 'Delete',
    MY_EVENT: 'My Event',
    ENTER_DESCRIPTION: 'Enter description',
    ENTER_LOCATION: 'Enter Location',
}
