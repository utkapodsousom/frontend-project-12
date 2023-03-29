import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import modalsReducer from './modalsSlice';

const store = configureStore({
  reducer: {
    channels: channelReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
});

export default store;
