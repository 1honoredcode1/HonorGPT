import { useState, useEffect } from "react";

import { useAppContext } from "../context/AppContext.jsx";

const ChatBox = () => {
  const { selectedChat } = useAppContext();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedChat) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">
      {/* Chat Messages */}
      <div className="flex-1 mb-5 overflow-y-scroll">
        {messages.length === 0 && <div className=""></div>}
      </div>

      {/* Prompt Input */}
      <div className=""></div>
    </div>
  );
};

export default ChatBox;
