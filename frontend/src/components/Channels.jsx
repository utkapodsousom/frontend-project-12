import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';
import { changeCurrentChannel } from '../slices/channelsSlice';
import AddChannelModal from './AddChannelModal';
import DeleteChannelModal from './DeleteChannelModal';
import RenameChannelModal from './RenameChannelModal';
import ChannelItem from './ChannelItem';

const renderModal = (modalParams, handleClose) => {
  const { type, channel } = modalParams;
  if (!type) {
    return null;
  }

  const modals = {
    add: AddChannelModal,
    remove: DeleteChannelModal,
    rename: RenameChannelModal,
  };

  const Modal = modals[modalParams.type];

  return <Modal channel={channel} handleClose={handleClose} />;
};

const Channels = ({ channels, currentChannel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [modalParams, setModalParams] = useState({
    type: null,
    channel: null,
  });

  const handleClose = () => setModalParams({ type: null, channel: null });

  const handleChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(changeCurrentChannel(id));
  };
  /* eslint-disable */
  return (
    <div className="sidebar flex flex-col shrink-0 w-60 absolute left-0 top-0 z-20 sm:static min-w-min text-center bg-slate-800 h-full overflow-hidden">
      <div className="text-gray-100 text-xl p-2">
        <div className="p-2.5 mt-1 flex items-center">
          <h2 className="font-bold text-lg text-gray-200 ml-3">{t('channels.channels')}</h2>
          <button
            type="button"
            onClick={() => setModalParams({ type: 'add' })}
            className="ml-auto appearance-none p-0 m-0 relative"
          >
            <PlusCircleIcon className="h-6 w-6" />
            <span className="invisible absolute h-[1px] w-[1px] left-1/2 top-1/2">+</span>
          </button>
        </div>
        <div className="my-2 bg-gray-600 h-[1px]" />
      </div>
      <ul className="h-full flex flex-col overflow-y-auto overflow-x-hidden p-2">
        {channels &&
          channels.map((channel) => (
            <React.Fragment key={channel.id}>
              <ChannelItem
                channel={channel}
                currentChannel={currentChannel}
                handleChannel={handleChannel}
                setModalParams={setModalParams}
              />
            </React.Fragment>
          ))}
      </ul>
      {renderModal(modalParams, handleClose)}
    </div>
  );
};

export default Channels;
