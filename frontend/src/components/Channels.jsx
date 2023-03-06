import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { changeChannel } from '../slices/channelsSlice';
import AddChannelModal from './AddChannelModal';

const Channels = ({ channels, currentChannel }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const dispatch = useDispatch();

  const handleChangeChannel = (id) => (e) => {
    e.preventDefault();

    dispatch(changeChannel(id));
  };

  return (
    <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-slate-800">
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <h1 className="font-bold text-gray-200 ml-3">Channels</h1>
          <button type="button" onClick={handleOpen} className="ml-auto appearance-none p-0 m-0">
            <PlusCircleIcon className="h-6 w-6" />
            <span className="invisible absolute h-0 w-0">+</span>
          </button>
        </div>
        <div className="my-2 bg-gray-600 h-[1px]" />
      </div>
      <ul>
        {channels && channels.map((channel) => (
          <li
            className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${
              currentChannel.id === channel.id ? 'bg-blue-600' : ''
            }`}
            key={channel.id}
          >
            <ChatBubbleLeftRightIcon className="h-6 w-6 mr-1" />
            <a
              href={`/${channel.id}`}
              onClick={handleChangeChannel(channel.id)}
              className="ml-4 text-gray-200 font-bold"
            >
              {`# ${channel.name}`}
            </a>
          </li>
        ))}
      </ul>
      <AddChannelModal show={show} handleClose={handleClose} />
    </div>
  );
};

export default Channels;
