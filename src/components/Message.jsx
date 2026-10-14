import Markdown from "react-markdown";

import { assets } from "../assets/assets.js";

import moment from "moment";

const Message = ({ message }) => {
  return (
    <div>
      {message.role === "user" ? (
        <div className="flex items-start justify-end my-4 gap-2">
          <div className="flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-primary/50 border border-[#80609F]/25 rounded-md max-w-2xl">
            <p className="text-sm dark:text-white">{message.content}</p>
            <span className="text-xs text-gray-500 dark:text-[#B1A6C0]">
              {moment(message.timestamp).format("MM/DD/YYYY HH:mm")}
            </span>
          </div>
          <img src={assets.user_icon} alt="User" className="w-8 rounded-full" />
        </div>
      ) : (
        <div
          className="inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 dark:bg-black/30 border border-[#80609F]/30 rounded-md my-4 
        "
        >
          {message.isImage ? (
            <img
              src={message.content}
              alt="Image"
              className="w-full max-w-md mt-2 rounded-md"
            />
          ) : (
            <div className="text-sm dark:text-white reset-tw">
              <Markdown>{message.content}</Markdown>
            </div>
          )}
          <span className="text-xs text-gray-500 dark:text-[#B1A6C0]">
            {moment(message.timestamp).format("MM/DD/YYYY HH:mm")}
          </span>
        </div>
      )}
    </div>
  );
};

export default Message;
