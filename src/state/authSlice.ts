import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  [key: string]: any;
}

interface AuthState {
  status: boolean;
  userData: User | null;
}

const storedAuth = sessionStorage.getItem("auth");

const initialState: AuthState = storedAuth
  ? JSON.parse(storedAuth)
  : {
      status: false,
      userData: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.status = true;
      state.userData = action.payload;
      sessionStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;

      sessionStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
