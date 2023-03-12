import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useChatContext } from '../contexts';
import { getCurrentChannel, changeCurrentChannel } from '../slices/channelsSlice';

const DeleteChannelModal = ({ handleClose, channel }) => {
  const { deleteChannel } = useChatContext();
  const dispatch = useDispatch();
  const currentChannel = useSelector(getCurrentChannel);
  const { id } = currentChannel;
  const [display, setDisplay] = useState(true);
  const { t } = useTranslation();

  const handleDelete = async () => {
    try {
      await deleteChannel(channel.id, () => {
        setDisplay(false);
        handleClose();
        if (id === channel.id) {
          dispatch(changeCurrentChannel(1));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Transition.Root
      show={display}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-10"
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-700 text-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-slate-700 p-4 relative">
                  <div className="sm:flex sm:items-start">
                    <div className="text-center sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="font-bold text-lg"
                      >
                        {`${t('modal.deleteChannel')} ${channel.name}`}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{t('modal.deleteChannelConfirmation')}</p>
                      </div>
                    </div>
                  </div>
                  <XMarkIcon
                    className="h-6 w-6 cursor-pointer absolute right-2 top-2 fill-gray-400"
                    onClick={handleClose}
                  />
                </div>
                <div className="bg-slate-600 p-4">
                  <div className="mt-0">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:mr-4 sm:w-auto"
                      onClick={handleDelete}
                    >
                      {t('modal.confirm')}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={handleClose}
                    >
                      {t('modal.cancel')}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DeleteChannelModal;
