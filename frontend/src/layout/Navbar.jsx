import React, { useContext, useEffect } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth.slice";
const Navbar = () => {
  const { isLoggedIn, auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="navbar bg-base-100 sm:px-8">
      <div className="flex-1">
        <NavLink className="btn btn-ghost text-xl hover:bg-transparent p-0">
          <img src="/main-logo.png" alt="logo" className="w-32" />
        </NavLink>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control max-sm:hidden">
          <input
            type="text"
            placeholder="Search projects kit"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>

        {auth?.isAdmin ? (
          <button
            onClick={() => navigate("/upload")}
            className="relative inline-flex items-center gap-2 px-4 py-2 font-semibold text-teal-50 bg-gradient-to-tr from-teal-900/30 via-teal-900/70 to-teal-900/30 ring-4 ring-teal-900/20 rounded-full overflow-hidden hover:opacity-90 transition-opacity before:absolute before:top-4 before:left-1/2 before:-translate-x-1/2 before:w-[100px] before:h-[100px] before:rounded-full before:bg-gradient-to-b before:from-teal-50/10 before:blur-xl"
          >
            Post Code
          </button>
        ) : null}

        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    auth?.photoUrl ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box  mt-3 w-52 p-2 shadow font-semibold z-50"
            >
              {auth?.isAdmin ? (
                <li>
                  <Link to={"/admin"} className="justify-between">
                    Admin
                    <span className="badge">New</span>
                  </Link>
                </li>
              ) : null}

              <li onClick={handleLogout} className="px-3 cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-ghost">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
