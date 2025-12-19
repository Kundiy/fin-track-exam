const API_PREFIX = 'api';
const API_VERSION = 'v1';
const API_OPEN = 'open';
const API_CLOSE = 'close';
export const API_OPEN_PATH_PREFIX = `/${API_OPEN}/${API_PREFIX}/${API_VERSION}`;
export const API_CLOSE_PATH_PREFIX = `/${API_CLOSE}/${API_PREFIX}/${API_VERSION}`;

export const API_V1 = Object.freeze({
    OPEN: {
        POST: {
            REGISTER: `/register`,
            LOGIN: `/login`,
        }
    },
    CLOSE: {
        GET: {
            CATEGORIES: `/categories`,
            CATEGORY_TYPES: `/category-types`,
            BALANCE: `/balance`,
        },
        POST: {
            CATEGORIES: `/categories`,
        },
        PUT: {
            CATEGORIES: `/categories`,
        },
        DELETE: {
            CATEGORIES: `/categories`,
        }
    }
});
