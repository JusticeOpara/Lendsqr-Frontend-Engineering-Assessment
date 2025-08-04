// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthState {
//   isAuthenticated: boolean;
//   user: string | null;
// }

// const initialState: AuthState = {
//   isAuthenticated: false,
//   user: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<string>) => {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       localStorage.setItem('user', action.payload);
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       localStorage.removeItem('user');
//     },
//     loadUserFromStorage: (state) => {
//       const user = localStorage.getItem('user');
//       if (user) {
//         state.isAuthenticated = true;
//         state.user = user;
//       }
//     },
//   },
// });

// export const { login, logout, loadUserFromStorage } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  loggedUser: User | null;
  selectedUser: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loggedUser: null,
  selectedUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.loggedUser = action.payload;
      localStorage.setItem('auth', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.loggedUser = null;
      localStorage.removeItem('auth');
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
      localStorage.setItem('selectedUser', JSON.stringify(action.payload));
    },
    loadFromStorage: (state) => {
      const user = localStorage.getItem('auth');
      const selected = localStorage.getItem('selectedUser');
      if (user) {
        state.isAuthenticated = true;
        state.loggedUser = JSON.parse(user);
      }
      if (selected) {
        state.selectedUser = JSON.parse(selected);
      }
    },
  },
});

export const { login, logout, setSelectedUser, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;
