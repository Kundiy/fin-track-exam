import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RegisterData, ResponseData, UserState } from "../../types";

const initialState: UserState = {
    isAuthenticated: false,
    user: null,
    error: undefined,
};

const API_URL = import.meta.env.VITE_API_KEY_OPEN;
const REGISTER_URL = `${API_URL}/register`;
const LOGIN_URL = `${API_URL}/login`;
export const client = axios.create();

export const registerNewUser = createAsyncThunk<ResponseData, RegisterData, { rejectValue: string }>(
    'user/registerNewUser',
    async (user, { rejectWithValue }) => {
        try {
            const result = await client.post(REGISTER_URL, user);
            const newToken = result.data.token;
            sessionStorage.setItem('token', newToken);
            client.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            return result.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.error || error.response.data.message || 'Email already exists';
                return rejectWithValue(errorMessage);
            }
            return rejectWithValue('Network error');
        }
    }
);

type LoginData = {
    email: string;
    password: string;
}

export const loginUser = createAsyncThunk<ResponseData, LoginData, { rejectValue: string }>(
    'user/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const result = await client.post(LOGIN_URL, credentials);
            const newToken = result.data.token;
            sessionStorage.setItem('token', newToken);
            client.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            return result.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.error || error.response.data.message || 'Invalid email or password';
                return rejectWithValue(errorMessage);
            }
            return rejectWithValue('Network error');
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Stub: login
        loginSuccessMock: (state) => {
            state.isAuthenticated = true;
            state.user = { id: 'u1', email: 'test@example.com' };
        },
        // Stub: logout
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = '';
        },
        //If error in register form "email already exist
        clearRegistrationError: (state) => {
            state.error = '';
        },

        clearLoginError: (state) => {
            state.error = '';
        },

        setAuthToken: (state) => {
            const isAuth = sessionStorage.getItem('token');
            if (!isAuth) return;
            state.isAuthenticated = true;
            state.user = { id: 'u1', email: 'test@example.com' };
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registerNewUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = '';
            })
            .addCase(registerNewUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = '';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    }

});



export const { loginSuccessMock, logout, clearRegistrationError, setAuthToken } = userSlice.actions;

export default userSlice.reducer;