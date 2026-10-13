import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { dummyChats, dummyUserData } from "../assets/assets.js";
import { AppContext } from "./AppContextValue.js";

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(dummyUserData);
  const [chats, setChats] = useState(dummyChats);
  const [selectedChat, setSelectedChat] = useState(dummyChats[0] || null);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = {
    user,
    setUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    theme,
    setTheme,
    navigate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
