import React, { useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
const Layout = ({ children }) => {
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className="w-full h-auto bg-black text-white relative">
      <Navbar />
      <main className="w-full min-h-[80vh] sm:px-8">{children}</main>
      <Footer />

      <Toaster />
    </div>
  );
};

export default Layout;
