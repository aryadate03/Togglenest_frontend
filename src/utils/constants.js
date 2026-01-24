
export const API_BASE_URL = 'https://togglenest-backend-1-6utk.onrender.com/api';

export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        ME: '/auth/me'
    },
    PROJECTS: '/projects',
    TASKS: '/tasks'
};

export const STORAGE_KEYS = {
    TOKEN: 'togglenest_token',
    USER: 'togglenest_user'
};

export const TASK_STATUS = {
    TODO: 'todo',              // ✅ lowercase (match backend)
    IN_PROGRESS: 'in-progress', // ✅ Fix typo: PROFRESS → PROGRESS
    DONE: 'done'
};

export const USER_ROLES = {
    ADMIN: 'admin',
    MEMBER: 'member'

};


