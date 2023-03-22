import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts';
import { fetchChatData, getChannels, getCurrentChannel } from '../slices/channelsSlice';
import { Channels, Messages } from '../components/index';

const ChatPage = () => {
  const { userData, getToken } = useAuthContext();
  const { token } = userData;
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const currentChannel = useSelector(getCurrentChannel);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/login');
    else {
      dispatch(fetchChatData(getToken()));
    }
  }, [navigate, token, getToken, dispatch]);

  if (token) {
    return (
      <div className="content flex flex-nowrap relative">
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
