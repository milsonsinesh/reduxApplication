import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  users: [
    { id: nanoid(), name: 'Admin 1', email: 'admin1@gmail.com', role: 'Super Admin', status: 'Active' },
    { id: nanoid(), name: 'Test', email: 'test@gmail.com', role: 'Admin', status: 'Inactive' },
  ],
  loggedIn: false,
  email: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.email = action.payload;
    },
    logout(state) {
      state.loggedIn = false;
      state.email = '';
    },
    addUser: (state, action) => { state.users.push({ id: nanoid(), ...action.payload }); },
    deleteUser: (state, action) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    },
    updateUser: (state, action) => {
      const idx = state.users.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) state.users[idx] = action.payload;
    },
    toggleUserStatus: (state, action) => {
      const user = state.users.find(u => u.id === action.payload);
      if (user) user.status = user.status === 'Active' ? 'Inactive' : 'Active';
    },
  },
});

export const { login, logout, addUser, deleteUser, updateUser, toggleUserStatus } = userSlice.actions;
export default userSlice.reducer;