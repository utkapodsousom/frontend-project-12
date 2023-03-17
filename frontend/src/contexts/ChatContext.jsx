import React, { useCallback, useContext, useMemo } from 'react';

export const ChatContext = React.createContext({});
const useChatContext = () => useContext(ChatContext);
export const ChatProvider = ({ socket, children }) => {
  const makeEmitPromises = useCallback(
    (event, arg) => new Promise((resolve, reject) => {
      socket
        .timeout(5000)
        .emit(event, arg, (err, res) => (res.status === 'ok' ? resolve(res.data) : reject(err)));
    }),
    [socket],
  );

  const sendMessage = useCallback(
    (body, channelId, username, cb) => {
      socket.emit('newMessage', { body, channelId, username }, cb);
    },
    [socket],
  );

  const createChannel = useCallback(
    (name) => makeEmitPromises('newChannel', { name }),
    [makeEmitPromises],
  );

  const deleteChannel = useCallback(
    (id, cb) => {
      socket.emit('removeChannel', { id }, cb);
    },
    [socket],
  );

  const renameChannel = useCallback(
    (name, id, cb) => {
      socket.emit('renameChannel', { name, id }, cb);
    },
    [socket],
  );

  const providerValue = useMemo(
    () => ({
      sendMessage,
      createChannel,
      deleteChannel,
      renameChannel,
    }),
    [sendMessage, createChannel, deleteChannel, renameChannel],
  );

  return <ChatContext.Provider value={providerValue}>{children}</ChatContext.Provider>;
};
export default useChatContext;
