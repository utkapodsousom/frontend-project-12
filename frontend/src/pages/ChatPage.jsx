import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { fetchChannelsData, getChannels } from "../slices/channelsSlice";

const ChatPage = () => {
  const { token, getHeaders } = useAuthContext();
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
    else {
      dispatch(fetchChannelsData(getHeaders()));
    }
  }, [navigate, token, getHeaders, dispatch]);

  return (
    <div>
      <h1>Chat</h1>
      <h2>Channels</h2>
      <ul>
        {channels &&
          channels.map((channel) => (
            <li key={channel.id}>{channel.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default ChatPage;
