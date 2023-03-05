import { getChannelMessages } from "../slices/messagesSlice";
import { v4 as generateId } from "uuid";
import { useSelector } from "react-redux";
import { useAuthContext, useChatContext } from "../contexts";
import { useEffect, useState } from "react";

const Messages = ({ currentChannel }) => {
  const { user } = useAuthContext();
  const [isBlocked, setBlocked] = useState(false);
  const [message, setMessage] = useState("");
  const { sendMessage } = useChatContext();
  const { name, id } = currentChannel;
  const messages = useSelector(getChannelMessages(id));
  console.log(messages);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlocked(true);
    sendMessage(message, id, user.username, () => {
      setMessage("");
      setBlocked(false);
    });
  };

  useEffect(() => {}, [messages]);

  return (
    <div className="container h-screen pl-[300px] w-full bg-slate-700">
      <div className="chat flex flex-col h-full p-10">
        <h3>{name}</h3>
        <ul className="chat__window border-2 flex flex-col justify-end border-slate-800 bg-slate-600 rounded-md p-4 text-white flex-grow">
          {messages.length > 0 &&
            messages.map(({ body, username }) => (
              <li key={generateId()}>
                <span className="font-bold">{username}:&nbsp;</span>
                {body}
              </li>
            ))}
        </ul>
        <form action="" method="post" noValidate onSubmit={handleSubmit}>
          <div className="chat__input flex justify-center mt-4 border-2 border-slate-800 rounded-md text-white relative overflow-hidden">
            <textarea
              type="text"
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write something..."
              className="p-2 pr-24 w-full z-10 bg-slate-600 outline-slate-300 resize-none block"
            />
            <button
              type="submit"
              disabled={isBlocked}
              className="absolute z-20 right-4 py-2 px-4 top-1/2 translate-y-[-50%] rounded-md bg-indigo-600 hover:bg-indigo-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Messages;
