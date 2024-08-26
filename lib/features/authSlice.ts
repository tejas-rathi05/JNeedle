// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  status: boolean;
  userData: any; // Adjust this according to your user type
}

const initialState: AuthState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<any>) { // Adjust the payload type accordingly
      state.status = true;
      state.userData = action.payload;
    },
    logout(state) {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
