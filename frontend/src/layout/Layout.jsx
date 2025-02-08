import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
const Layout = ({ children }) => {
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
