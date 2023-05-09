import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  page: 1,
  totalPages: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomers(state, action) {
      state.items = action.payload.data;
      state.totalPages = action.payload.totalPages;
    },

    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { setCustomers, setPage } = customerSlice.actions;
export default customerSlice.reducer;
