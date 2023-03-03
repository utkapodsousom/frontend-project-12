import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { fetchChannelsData, getChannels } from "../slices/channelsSlice";
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

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
    <div className="flex columns-2">
      <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-slate-800">
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <h1 className="font-bold text-gray-200 ml-3">Channels</h1>
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <ul>
          {channels &&
            channels.map((channel) => (
              <li
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                key={channel.id}
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6 mr-1" />
                <span className="ml-4 text-gray-200 font-bold">
                  {channel.name}
                </span>
              </li>
            ))}
        </ul>
      </div>
      <div className="container h-screen pl-[300px] w-full bg-slate-700">
        <div className="chat flex flex-col h-full p-10">
          <div className="char__window border-2 border-slate-800 bg-slate-600 rounded-md p-4 text-white flex-grow">
          </div>
          <div className="chat__input flex justify-center mt-4 border-2 border-slate-800 rounded-md text-white relative overflow-hidden">
            <textarea type="text" name="message" id="message" placeholder="Write something..." className="p-2 pr-24 w-full z-10 bg-slate-600 outline-slate-300 resize-none block" />
            <button type="submit" className="absolute z-20 right-4 py-2 px-4 top-1/2 translate-y-[-50%] rounded-md bg-indigo-600 hover:bg-indigo-700">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
