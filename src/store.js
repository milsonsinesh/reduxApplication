import { configurationStore } from '@reduxjs/toolkit';
import { userReducer } from '.features/user/userSlice';

export const store = configurationStore({
    reducer: {
        user: userReducer,
    }
})