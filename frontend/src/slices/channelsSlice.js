/* eslint no-param-reassign: 0 */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes/routes';

export const fetchChatData = createAsyncThunk('channel/fetchChatData', async (token, { rejectWithValue }) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(routes.api.data(), { headers });
    const { data } = response;
    return data;
  } catch (e) {
    return rejectWithValue({ name: e.name, statusCode: e?.response?.status });
  }
});

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    currentChannelId: 1,
    loadingStatus: 'idle',
    loadingError: null,
  }),
  reducers: {
    changeCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
    },
    deleteChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
    resetLoadingState: (state) => {
      state.loadingStatus = 'idle';
      state.loadingError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatData.pending, (state) => {
      state.loadingStatus = 'loading';
      state.loadingError = null;
    }).addCase(fetchChatData.fulfilled, (state, { payload }) => {
      const { channels } = payload;
      channelsAdapter.setAll(state, channels);
      state.loadingStatus = 'idle';
      state.loadingError = null;
    }).addCase(fetchChatData.rejected, (state, { error }) => {
      state.loadingStatus = 'failed';
      state.loadingError = error;
    });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const getChannels = (state) => selectors.selectAll(state);
export const getChannelsNames = (state) => getChannels(state).map(({ name }) => name);
export const getCurrentChannel = (state) => getChannels(state)
  .find(({ id }) => id === state.channels.currentChannelId);
export const getLoadingStatus = (state) => state.channels.loadingStatus;
export const getLoadingError = (state) => state.channels.loadingError;

export const {
  changeCurrentChannel, addChannel, deleteChannel, updateChannel, resetLoadingState,
} = channelsSlice.actions;

export default channelsSlice.reducer;
