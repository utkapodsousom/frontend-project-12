import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAuthContext, useChatContext } from '../contexts';
import {
  fetchChatData, getChannels, getCurrentChannel, getLoadingError, resetLoadingState,
} from '../slices/channelsSlice';
import { Channels, Messages } from '../components/index';
import getModal from '../components/modals/index';
import toastsParams from '../toastParams';

const ChatPage = () => {
  const { t } = useTranslation();
  const { userData, getToken, logout } = useAuthContext();
  const { token } = userData;
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const currentChannel = useSelector(getCurrentChannel);
  const loadingError = useSelector(getLoadingError);
  const { socketConnection } = useChatContext();
  const { show, type, channel } = useSelector((state) => state.modals);

  useEffect(() => {
    dispatch(fetchChatData(getToken()));
  }, [socketConnection, getToken, dispatch]);

  useEffect(() => {
    if (loadingError) {
      if (loadingError.statusCode === 401) {
        toast.warn(t('errors.login'), toastsParams.getDefaultParams());
        logout();
      } else {
        toast.error(t('errors.connection'), toastsParams.getDefaultParams());
      }
    }
  }, [loadingError, logout, t, dispatch]);

  useEffect(() => () => dispatch(resetLoadingState()), [dispatch]);

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
