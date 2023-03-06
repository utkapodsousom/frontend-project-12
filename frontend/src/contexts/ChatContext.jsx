import React, {
  createContext, useCallback, useContext, useMemo,
} from 'react';

export const ChatContext = createContext({});
const useChatContext = () => useContext(ChatContext);

export function ChatProvider({ socket, children }) {
  const sendMessage = useCallback(
    (body, channelId, username, cb) => {
      socket.emit('newMessage', { body, channelId, username }, cb);
    },
    [socket],
  );

  const createChannel = useCallback((name, cb) => {
    socket.emit('newChannel', { name }, cb);
  }, [socket]);

  const providerValue = useMemo(
    () => ({ sendMessage, createChannel }),
    [sendMessage, createChannel],
  );

  return (
    <ChatContext.Provider value={providerValue}>{children}</ChatContext.Provider>
  );
}

export default useChatContext;
