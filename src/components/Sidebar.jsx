import { useState } from "react";

import { useAppContext } from "../context/useAppContext.js";

import { assets } from "../assets/assets.js";

import moment from "moment";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const {
    chats,
    setChats,
    setSelectedChat,
    theme,
    setTheme,
    user,
    setUser,
    navigate,
  } = useAppContext();

  const [search, setSearch] = useState("");

  // Create a new chat
  const handleNewChat = () => {
    setSelectedChat(null);
    navigate("/");
    setIsMenuOpen(false);
  };

  // Delete a chat
  const handleDeleteChat = (e, chatId) => {
    e.stopPropagation();

    setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));

    // Clear selection if the deleted chat was selected
    setSelectedChat((prevSelected) =>
      prevSelected?._id === chatId ? null : prevSelected,
    );
  };

  // Log out the current user
  const handleLogout = () => {
    setUser(null);
    setIsMenuOpen(false);
    navigate("/");
  };

  // Filter chats by search
  const filteredChats = chats.filter((chat) => {
    const firstMessage = chat.messages?.[0]?.content;

    const chatTitle =
      typeof firstMessage === "string" ? firstMessage : chat.name || "";

    return chatTitle.toLowerCase().includes(search.toLowerCase().trim());
  });

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-72
    flex flex-col p-5
    bg-white dark:bg-linear-to-b
    dark:from-[#242124] dark:to-[#000000]
    border-r border-[#80609F]/30
    backdrop-blur-3xl
    transition-transform duration-500 z-50
    ${!isMenuOpen ? "max-md:-translate-x-full" : "max-md:translate-x-0"}`}
    >
      {/* Logo */}
      <img
        src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
        alt="HonorGPT Logo"
        className="w-full max-w-38"
      />

      {/* New Chat Button */}
      <button
        onClick={handleNewChat}
        className="flex justify-center items-center w-full py-2
          mt-10 text-white bg-linear-to-l from-primary
          to-secondary text-sm rounded-md cursor-pointer
          hover:opacity-90 transition-all"
      >
        <span className="mr-2 text-xl">+</span>
        New Chat
      </button>

      {/* Search Conversations */}
      <div
        className="flex items-center gap-2 p-3 mt-4
          border border-gray-500 dark:border-white/20
          rounded-md"
      >
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-4 not-dark:invert"
        />

        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search conversations..."
          className="text-sm placeholder:text-gray-400
            outline-none min-w-0 w-full bg-transparent"
        />
      </div>

      {/* Recent Chats */}
      {chats.length > 0 && <p className="text-sm mt-4">Recent Chats</p>}

      <div className="flex-1 min-h-0 overflow-y-auto mt-3 text-sm space-y-3">
        {filteredChats.map((chat) => {
          const firstMessage = chat.messages?.[0]?.content;

          const chatTitle =
            typeof firstMessage === "string"
              ? firstMessage
              : chat.name || "New Chat";

          return (
            <div
              key={chat._id}
              onClick={() => {
                navigate("/");
                setSelectedChat(chat);
                setIsMenuOpen(false);
              }}
              className="p-2 px-4 dark:bg-[#57317C]/10
                border border-gray-500
                dark:border-[#80609F]/12
                rounded-md cursor-pointer
                flex justify-between items-center
                gap-2 group hover:bg-gray-100
                dark:hover:bg-[#57317C]/20
                transition-all"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate w-full">{chatTitle.slice(0, 32)}</p>

                <p
                  className="text-xs text-gray-600
                    dark:text-[#B1A6C0]"
                >
                  {chat.updatedAt ? moment(chat.updatedAt).fromNow() : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => handleDeleteChat(e, chat._id)}
                aria-label="Delete chat"
                className="hidden group-hover:block
                  cursor-pointer shrink-0
                  max-md:block"
              >
                <img
                  src={assets.bin_icon}
                  alt=""
                  className="w-4 not-dark:invert"
                />
              </button>
            </div>
          );
        })}

        {chats.length > 0 && filteredChats.length === 0 && (
          <p className="text-center text-gray-500 text-xs mt-4">
            No conversations found.
          </p>
        )}
      </div>

      {/* Community Images */}
      <div
        onClick={() => {
          navigate("/community");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-2 p-3 mt-4
          border border-gray-400 dark:border-white/20
          rounded-md cursor-pointer
          hover:scale-103 transition-all"
      >
        <img
          src={assets.gallery_icon}
          alt="Community"
          className="w-4.5 not-dark:invert"
        />

        <div className="flex flex-col text-sm">
          <p>Community Images</p>
        </div>
      </div>

      {/* Credit Purchases */}
      <div
        onClick={() => {
          navigate("/credits");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-2 p-3 mt-4
          border border-gray-400 dark:border-white/20
          rounded-md cursor-pointer
          hover:scale-103 transition-all"
      >
        <img
          src={assets.diamond_icon}
          alt="Credit Purchases"
          className="w-4.5 dark:invert"
        />

        <div className="flex flex-col text-sm">
          <p>Credits : {user?.credits ?? 0}</p>

          <p className="text-sm text-gray-500">
            Purchase credits to use HonorGPT.
          </p>
        </div>
      </div>

      {/* Theme Toggle */}
      <div
        className="flex items-center justify-between
          gap-2 p-3 mt-4 border border-gray-400
          dark:border-white/20 rounded-md"
      >
        <div className="flex items-center gap-2 text-sm">
          <img
            src={assets.theme_icon}
            alt="Dark Mode"
            className="w-4 not-dark:invert"
          />

          <p>Dark Mode</p>
        </div>

        <label className="relative inline-flex cursor-pointer">
          <input
            onChange={() =>
              setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
            }
            type="checkbox"
            className="sr-only peer"
            checked={theme === "dark"}
          />

          <div
            className="relative w-9 h-5 bg-gray-500 rounded-full
      peer-checked:bg-primary
      peer-checked:[&>span]:translate-x-4
      transition-colors"
          >
            <span
              className="absolute left-1 top-1
                w-3 h-3 bg-white rounded-full
                transition-transform"
            />
          </div>
        </label>
      </div>

      {/* User Info */}
      <div
        className="flex items-center gap-3 p-3 mt-4
          border border-gray-400 dark:border-white/20
          rounded-md cursor-pointer group"
      >
        <img src={assets.user_icon} alt="User" className="w-7 rounded-full" />

        <p
          className="flex-1 min-w-0 text-sm
            dark:text-white truncate"
        >
          {user ? user.name : "Login to your account!"}
        </p>

        {user && (
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
            className="hidden group-hover:block
              cursor-pointer max-md:block"
          >
            <img
              src={assets.logout_icon}
              alt=""
              className="h-5 not-dark:invert"
            />
          </button>
        )}
      </div>

      {/* Mobile Close Button */}
      <img
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        alt="Close Sidebar"
        className="absolute top-3 right-3 w-5 h-5
          cursor-pointer md:hidden not-dark:invert"
      />
    </div>
  );
};

export default Sidebar;
