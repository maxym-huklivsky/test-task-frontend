import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthInfo(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    setRefresh(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = initialState.user;
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { setAuthInfo, setRefresh, logout } = authSlice.actions;
export default authSlice.reducer;
