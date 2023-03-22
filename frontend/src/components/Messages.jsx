import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as generateId } from 'uuid';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { getChannelMessages } from '../slices/messagesSlice';
import { useAuthContext, useChatContext } from '../contexts';
import getMessageSchema from '../schemas/messageSchema';
import toastsParams from '../toastParams';

const Messages = ({ currentChannel }) => {
  const { userData } = useAuthContext();
  const [isBlocked, setBlocked] = useState(false);
  const { sendMessage } = useChatContext();
  const { name, id } = currentChannel;
  const messages = useSelector(getChannelMessages(id));
  const messageInput = useRef(null);
  const bottomRef = useRef(null);
  const { t } = useTranslation();

  const onSubmit = async (values, { resetForm }) => {
    const { message } = values;
    setBlocked(true);
    try {
      await sendMessage(message, id, userData.username);
      resetForm();
    } catch (err) {
      toast.error(t('error.connection'), toastsParams.getDefaultParams());
    } finally {
      setBlocked(false);
    }
  };

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behaviour: 'smooth', block: 'nearest', inline: 'start' });
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: getMessageSchema(),
    onSubmit,
  });

  useEffect(() => {
    if (messages.length > 0 && messages.at(-1).username === userData.username) {
      scrollToBottom();
    }
    messageInput.current.focus();
  }, [messages, userData]);

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
        onSubmit={formik.handleSubmit}
        className="mt-auto"
      >
        <div className="chat__input flex flex-nowrap items-center mt-4 align-top p-2 border-2 border-slate-800 rounded-md text-white relative">
          <input
            type="text"
            name="message"
            id="message"
            value={formik.values.message}
            aria-label={t('messages.newMessage')}
            onChange={formik.handleChange}
            ref={messageInput}
            placeholder={t('messages.newMessage')}
            disabled={isBlocked}
            className="p-2 mr-2 w-full z-10 bg-slate-700 h-auto outline-none resize-none"
          />
          <button
            type="submit"
            disabled={isBlocked || formik.values.message.trim() === ''}
            className="py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed font-bold cursor-pointer"
          >
            {t('messages.send')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Messages;
