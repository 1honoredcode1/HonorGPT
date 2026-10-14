import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";

import Credits from "./pages/Credits";
import Community from "./pages/Community";

import { assets } from "./assets/assets.js";
import "./assets/prism.css";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          alt="Menu"
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert"
          onClick={() => setIsMenuOpen(true)}
        />
      )}
      <div className="min-h-screen w-screen bg-white text-gray-900 transition-colors dark:bg-linear-to-l dark:from-red-900 dark:to-black dark:text-white">
        <div
          className="md:ml-72 min-w-0 min-h-screen
          flex flex-col"
        >
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <Routes>
            <Route path="/" element={<ChatBox />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
