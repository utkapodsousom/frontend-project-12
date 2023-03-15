import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as generateId } from 'uuid';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { getChannelMessages } from '../slices/messagesSlice';
import { useAuthContext, useChatContext } from '../contexts';

const Messages = ({ currentChannel }) => {
  const { user } = useAuthContext();
  const [isBlocked, setBlocked] = useState(false);
  const [message, setMessage] = useState('');
  const { sendMessage } = useChatContext();
  const { name, id } = currentChannel;
  const messages = useSelector(getChannelMessages(id));
  const messageInput = useRef(null);
  const bottomRef = useRef(null);
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlocked(true);
    sendMessage(message, id, user.username, () => {
      setMessage('');
      setBlocked(false);
    });
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      handleSubmit(e);
    }
  };

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behaviour: 'smooth', block: 'nearest', inline: 'start' });
  };

  useEffect(() => {
    if (messages.length > 0 && messages.at(-1).username === user.username) {
      scrollToBottom();
    }
    messageInput.current.focus();
  }, [messages, user]);

  return (
    <div className="chat flex flex-col w-full h-full p-4 bg-slate-700">
      <h3 className="font-bold text-white">{`# ${name}`}</h3>
      <span className="text-slate-500 text-sm mb-4">
        {t('messages.messages', { count: messages.length })}
      </span>
      <ul className="flex-1 overflow-y-auto">
        {messages.length > 0 && messages.map(({ body, username }) => (
          <li
            className="message text-white"
            key={generateId()}
          >
            <p className="break-words text-break">
              <span className="font-bold">
                {username}
                :&nbsp;
              </span>
              {filter.clean(body)}
            </p>
          </li>
        ))}
        <div ref={bottomRef} />
      </ul>
      <form
        action=""
        method="post"
        noValidate
        onSubmit={handleSubmit}
        className="mt-auto"
      >
        <div className="chat__input flex flex-nowrap items-center mt-4 align-top p-2 border-2 border-slate-800 rounded-md text-white relative">
          <textarea
            type="text"
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeypress}
            ref={messageInput}
            placeholder={t('messages.newMessage')}
            disabled={isBlocked}
            className="p-2 mr-2 w-full z-10 bg-slate-700 h-auto outline-none resize-none"
          />
          <button
            type="submit"
            disabled={isBlocked || message.trim() === ''}
            className="py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 font-bold cursor-pointer"
          >
            {t('messages.send')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Messages;
