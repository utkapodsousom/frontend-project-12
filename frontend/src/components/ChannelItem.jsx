import React, { Fragment } from 'react';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';

const ChannelItem = ({
  channel, currentChannel, handleChannel, setModalParams,
}) => {
  const { id, name, removable } = channel;
  const { id: currentChannelId } = currentChannel;

  return (
    <li
      className={`relative p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${
        currentChannelId === id ? 'bg-blue-600' : ''
      }`}
    >
      <a
        href={`/${id}`}
        onClick={handleChannel(id)}
        className="ml-4 text-gray-200 font-bold flex-grow text-left"
      >
        {`# ${name}`}
      </a>
      {removable ? (
        <Menu as={Fragment}>
          <Menu.Button>
            <ChevronDownIcon className="w-6 h-6 color-white" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-10 right-0 top-[100%] mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setModalParams({ type: 'rename', channel })}
                  >
                    Rename
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setModalParams({ type: 'remove', channel })}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : null}
    </li>
  );
};

export default ChannelItem;
