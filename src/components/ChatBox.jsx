import { useState, useEffect } from "react";

import Message from "./Message.jsx";

import { useAppContext } from "../context/useAppContext.js";

import { assets } from "../assets/assets.js";

const ChatBox = () => {
  const { selectedChat, theme } = useAppContext();

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
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-primary">
            <img
              src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
              alt="Logo"
              className="w-full max-w-46 sm:max-w-58"
            />
            <p className="mt-5 text-3xl sm:text-4xl text-center text-gray-500 dark:text-white/70">
              Ask me anything!
            </p>
          </div>
        )}
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>

      {/* Prompt Input */}
      <div className=""></div>
    </div>
  );
};

export default ChatBox;
