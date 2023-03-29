import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts';
import { fetchChatData, getChannels, getCurrentChannel } from '../slices/channelsSlice';
import { Channels, Messages } from '../components/index';
import getModal from '../components/modals/index';

const ChatPage = () => {
  const { userData, getToken } = useAuthContext();
  const { token } = userData;
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const currentChannel = useSelector(getCurrentChannel);
  const navigate = useNavigate();
  const { show, type, channel } = useSelector((state) => state.modals);

  useEffect(() => {
    dispatch(fetchChatData(getToken()));
  }, [navigate, token, getToken, dispatch]);

  const renderModal = (status, option) => {
    if (!status) {
      return null;
    }
    const Modal = getModal(option);
    return <Modal channel={channel} />;
  };

  if (token) {
    return (
      <>
        <div className="content flex flex-nowrap relative">
          <Channels
            channels={channels}
            currentChannel={currentChannel}
          />
          {channels.length > 0 && <Messages currentChannel={currentChannel} />}
        </div>
        {renderModal(show, type)}
      </>
    );
  }

  return <div />;
};

export default ChatPage;
