import React, { useEffect, useContext } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import ProjectsKit from "../components/ProjectsKit";

import { NavLink, useNavigate } from "react-router-dom";
import { languages } from "../lib/languages";
import { useSelector } from "react-redux";
import slugify from "slugify";
import Card from "../components/Card";
const Home = () => {
  const { isLoggedIn, auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <div>
      <div className="relative">
        <button
          className="absolute bg-black px-2 h-full left-0 top-1/2 transform -translate-y-1/2 z-10"
          onClick={() => {
            document
              .querySelector(".scroll-container")
              .scrollBy({ left: -180, behavior: "smooth" });
          }}
        >
          <IoIosArrowBack />
        </button>
        <div className="overflow-x-scroll text-nowrap no-scrollbar px-4 scroll-container">
          <ul className="inline-block whitespace-nowrap px-4">
            {languages.map((e, index) => (
              <li
                className="inline-block mx-1 my-2 cursor-pointer px-2"
                key={index}
              >
                <NavLink to={`/language/${e.value.toLocaleLowerCase()}`}>
                  {e.language}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="absolute bg-black px-2 h-full right-0  top-1/2 transform -translate-y-1/2 z-10"
          onClick={() => {
            document
              .querySelector(".scroll-container")
              .scrollBy({ left: 180, behavior: "smooth" });
          }}
        >
          <IoIosArrowForward />
        </button>
      </div>

      <div className="w-full min-h-[80vh]  relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:size-48  before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl before:top-0 after:size-56 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:bottom-4 after:-right-12 content-center">
        <h1 className="lg:text-7xl md:text-5xl text-3xl sm:font-bold text-center px-12 ">
          Welcome To Notebookify ✌️ store online note and Quick code
        </h1>
      </div>

      <h1 className="text-xl font-semibold my-4 px-4">Project Kits</h1>

      <div className="w-full h-auto flex items-center justify-center flex-wrap gap-4 my-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Home;
