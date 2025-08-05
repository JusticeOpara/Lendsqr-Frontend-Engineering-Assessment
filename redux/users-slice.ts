import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUserProfile from "@/types/IUserProfile";

interface UserState {
  selectedUser: IUserProfile | null;
}

const initialState: UserState = {
  selectedUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<IUserProfile>) => {
      state.selectedUser = action.payload;
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
      localStorage.removeItem("selectedUser");
    },
    loadUserFromStorage: (state) => {
      const stored = localStorage.getItem("selectedUser");
      if (stored) {
        state.selectedUser = JSON.parse(stored);
      }
    },
  },
});

export const { setSelectedUser,clearSelectedUser, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
