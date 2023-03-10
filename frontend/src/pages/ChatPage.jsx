import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts';
import { fetchChatData, getChannels, getCurrentChannel } from '../slices/channelsSlice';
import { Channels, Messages } from '../components/index';

const ChatPage = () => {
  const { user, getHeaders } = useAuthContext();
  const { token } = user;
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const currentChannel = useSelector(getCurrentChannel);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/login');
    else {
      dispatch(fetchChatData(getHeaders()));
    }
  }, [navigate, token, getHeaders, dispatch]);

  if (token) {
    return (
      <div className="content flex flex-nowrap">
        <Channels
          channels={channels}
          currentChannel={currentChannel}
        />
        {channels.length > 0 && <Messages currentChannel={currentChannel} />}
      </div>
    );
  }

  return <div />;
};

export default ChatPage;
