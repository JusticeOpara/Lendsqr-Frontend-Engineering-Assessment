import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  loggedUser: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loggedUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.loggedUser = action.payload;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.loggedUser = null;
      localStorage.removeItem("auth");
    },

    loadFromStorage: (state) => {
      const user = localStorage.getItem("auth");
      if (user) {
        state.isAuthenticated = true;
        state.loggedUser = JSON.parse(user);
      }
    },
  },
});

export const { login, logout, loadFromStorage } = authSlice.actions;

export default authSlice.reducer;
