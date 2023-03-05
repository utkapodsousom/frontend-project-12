import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const Channels = ({ channels }) => (
  <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-slate-800">
    <div className="text-gray-100 text-xl">
      <div className="p-2.5 mt-1 flex items-center">
        <h1 className="font-bold text-gray-200 ml-3">Channels</h1>
      </div>
      <div className="my-2 bg-gray-600 h-[1px]" />
    </div>
    <ul>
      {channels && channels.map((channel) => (
        <li
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          key={channel.id}
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6 mr-1" />
          <a href={`/${channel.id}`} onClick={(e) => e.preventDefault()} className="ml-4 text-gray-200 font-bold">
            #
            {channel.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Channels;
