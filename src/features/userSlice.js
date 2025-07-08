import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
  { id: nanoid(), name: 'Admin 1', email: 'admin1@gmail.com', role: 'Super Admin', status: 'Active' },
  { id: nanoid(), name: 'Test', email: 'test@gmail.com', role: 'Admin', status: 'Inactive' },
];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => { state.push({ id: nanoid(), ...action.payload }); },
    deleteUser: (state, action) => state.filter(u => u.id !== action.payload),
    updateUser: (state, action) => {
      const idx = state.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    toggleUserStatus: (state, action) => {
      const user = state.find(u => u.id === action.payload);
      if (user) user.status = user.status === 'Active' ? 'Inactive' : 'Active';
    },
  },
});

export const { addUser, deleteUser, updateUser, toggleUserStatus } = userSlice.actions;
export default userSlice.reducer;