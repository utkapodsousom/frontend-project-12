import React, { Fragment, useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Dialog, Transition } from '@headlessui/react';
import { useChatContext } from '../contexts';
import { getChannelsNames } from '../slices/channelsSlice';
import channelNameSchema from '../schemas/channelNameSchema';

const RenameChannelModal = ({ handleClose, channel }) => {
  const [isAlreadyExists, setAlreadyExist] = useState(false);
  const { renameChannel } = useChatContext();
  const channelsNames = useSelector(getChannelsNames);
  const [display, setDisplay] = useState(true);

  const checkIsInputAlreadyExist = (value) => {
    if (channelsNames.includes(value)) {
      setAlreadyExist(true);
      return true;
    }

    setAlreadyExist(false);
    return false;
  };

  const onSubmit = async (values) => {
    try {
      if (!checkIsInputAlreadyExist(values.name)) {
        await renameChannel(values.name, channel.id, () => {
          setDisplay(false);
          handleClose();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelNameSchema,
    onSubmit,
  });

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
                        Rename Channel
                      </Dialog.Title>
                    </div>
                  </div>
                  <XMarkIcon className="h-6 w-6 cursor-pointer absolute right-2 top-2 fill-gray-400" onClick={handleClose} />
                </div>
                <div className="bg-slate-600 p-4">
                  <form
                    action=""
                    method="post"
                    onSubmit={formik.handleSubmit}
                  >
                    <label
                      htmlFor="name"
                      className="block text-md font-medium text-gray-700 dark:text-white"
                    >
                      Channel name:
                      <input
                        type="text"
                        className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 bg-slate-600 outline-slate-300 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-md invalid:border-pink-400 invalid:text-pink-500"
                        name="name"
                        id="name"
                        placeholder="Enter new channel name..."
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.name && (formik.errors.name || isAlreadyExists) ? (
                        <div className="absolute peer-invalid:visible text-pink-500 font-medium">
                          {formik.errors.name}
                        </div>
                      ) : null}
                      {isAlreadyExists && (
                        <div className="absolute peer-invalid:visible text-pink-500 font-medium">Name already exists</div>
                      )}
                    </label>
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:mr-4 sm:w-auto"
                      >
                        Add Channel
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default RenameChannelModal;
