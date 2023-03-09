import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as generateId } from 'uuid';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlocked(true);
    sendMessage(message, id, user.username, () => {
      setMessage('');
      setBlocked(false);
    });
  };

  useEffect(() => {
    messageInput.current.focus();
  }, [messages]);

  return (
    <div className="container h-[100%] pl-[300px] w-full bg-slate-700">
      <div className="chat flex flex-col h-full p-10">
        <h3>{name}</h3>
        <div className="chat__window border-2 flex flex-grow flex-col justify-end border-slate-800 bg-slate-600 rounded-md p-4 text-white min-h-0">
          <ul className="flex-grow min-h-0 overflow-y-scroll">
            {messages.length > 0 && messages.map(({ body, username }) => (
              <li className="flex break-words" key={generateId()}>
                <p className="max-w-[100%]">
                  <span className="font-bold">
                    {username}
                    :&nbsp;
                  </span>
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <form
          action=""
          method="post"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="chat__input flex justify-center mt-4 border-2 border-slate-800 rounded-md text-white relative overflow-hidden">
            <textarea
              type="text"
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              ref={messageInput}
              placeholder="Write something..."
              className="p-2 pr-24 w-full z-10 bg-slate-600 outline-slate-300 resize-none block"
            />
            <button
              type="submit"
              disabled={isBlocked}
              className="absolute z-20 right-4 py-2 px-4 top-1/2 translate-y-[-50%] rounded-md bg-indigo-600 hover:bg-indigo-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Messages;
