import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';

const ChannelItem = ({
  channel, currentChannel, handleChannel, setModalParams,
}) => {
  const { id, name, removable } = channel;
  const { id: currentChannelId } = currentChannel;
  const { t } = useTranslation();

  return (
    <li
      className={`relative mb-3 flex items-center justify-between rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white ${
        currentChannelId === id ? 'bg-blue-600' : ''
      }`}
    >
      <a
        href={`/${id}`}
        onClick={handleChannel(id)}
        className="flex-1 ml-4 text-left py-2.5 px-4"
      >
        <span className="text-gray-200 font-bold">{`# ${name}`}</span>
      </a>
      {removable ? (
        <Menu as={Fragment}>
          <Menu.Button className="relative">
            <ChevronDownIcon className="w-6 h-6 color-white" />
            <span className="invisible absolute w-[1px] h-[1px] top-1/2 left-1/2">
              Управление каналом
            </span>
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
            <Menu.Items className="absolute z-10 right-0 top-[100%] mt-2 w-full max-w-xs origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setModalParams({ type: 'rename', channel })}
                  >
                    {t('modal.rename')}
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
                    {t('modal.delete')}
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
