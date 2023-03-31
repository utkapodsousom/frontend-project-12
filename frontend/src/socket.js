import { io } from 'socket.io-client';
import store from './slices/index';
import { addMessage } from './slices/messagesSlice';
import {
  addChannel,
  changeCurrentChannel,
  deleteChannel,
  updateChannel,
} from './slices/channelsSlice';

const initSocket = () => {
  const socket = io();

  socket.on('connect_error', () => {
    localStorage.setItem('username', '');
    localStorage.setItem('userToken', '');
  });

  socket.on('connect', () => {
    socket.on('newMessage', (payload) => {
      store.dispatch(addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      store.dispatch(addChannel(payload));
    });

    socket.on('removeChannel', (payload) => {
      const { id } = payload;

      const { currentChannelId } = store.getState().channels;

      if (currentChannelId === id) {
        store.dispatch(changeCurrentChannel(1));
      }

      store.dispatch(deleteChannel(id));
    });

    socket.on('renameChannel', (payload) => {
      const { id, name } = payload;
      store.dispatch(updateChannel({ id, changes: { name } }));
    });
  });

  return socket;
};

export default initSocket;
