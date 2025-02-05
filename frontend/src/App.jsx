import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Upload from "./pages/Upload";

import ReadCode from "./pages/ReadCode";
import ProtectedRoute from "./lib/protectedRoute";
import { useSelector } from "react-redux";
import Pnf from "./pages/Pnf";
import Admin from "./pages/admin";
const App = () => {
  const { auth } = useSelector((state) => state.auth);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProtectedRoute route={<Home />} />} />
        <Route path="/upload" element={<ProtectedRoute route={<Upload />} />} />
        <Route path="/admin" element={<ProtectedRoute route={<Admin />} />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/language/:language" element={<ReadCode />} />
      </Routes>
    </Layout>
  );
};

export default App;
