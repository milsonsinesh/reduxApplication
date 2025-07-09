import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';


const persistedUsers = JSON.parse(localStorage.getItem('usersState'));

const store = configureStore({
  reducer: {
    users: userReducer,
  },
  preloadedState: persistedUsers ? { users: persistedUsers } : undefined,
});


store.subscribe(() => {
  localStorage.setItem('usersState', JSON.stringify(store.getState().users));
});

export default store;