/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  type: null,
  channel: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.show = true;
      state.type = payload.type;
      state.channel = payload.channel || null;
    },
    closeModal: (state) => {
      state.show = false;
      state.type = null;
      state.channel = null;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
