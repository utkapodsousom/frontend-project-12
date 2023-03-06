import { io } from 'socket.io-client';
import store from './slices';
import { changeChannel, addChannel } from './slices/channelsSlice';
import { addMessage } from './slices/messagesSlice';

const socket = io();

socket.on('connect', () => {
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    const { id } = payload;
    store.dispatch(addChannel(payload));
    store.dispatch(changeChannel(id));
  });
});

export default socket;
