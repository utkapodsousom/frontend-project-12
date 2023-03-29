import AddChannel from './AddChannelModal';
import DeleteChannel from './DeleteChannelModal';
import RenameChannel from './RenameChannelModal';

const modals = {
  addChannel: AddChannel,
  deleteChannel: DeleteChannel,
  renameChannel: RenameChannel,
};

export default (modalName) => modals[modalName];
