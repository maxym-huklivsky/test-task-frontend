import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  page: 1,
  totalPages: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvents(state, action) {
      state.items = action.payload.data;
      state.totalPages = action.payload.totalPages;
    },

    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { setEvents, setPage } = eventSlice.actions;
export default eventSlice.reducer;
