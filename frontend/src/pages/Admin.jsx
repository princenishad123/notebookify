import React, { useState } from "react";
import { useGetUsersQuery, useSignupMutation } from "../rtkQuery/query";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import ButtonLoader from "../components/ButtonLoader";
const Admin = () => {
  const { data, isLoading, isError } = useGetUsersQuery();
  const [signup, { isLoading: signinLoader }] = useSignupMutation();
  const handleSignin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const res = await signup(data);
    if (res.error) return toast.error(res.error.data.message);

    if (res.data) return toast.success(res.data.message);
  };
  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <h1 className="text-xl font-semibold">Users</h1>

        <button
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 inline-flex items-center justify-center px-6 py-2 border-0 rounded-full text-sm font-medium text-white bg-gradient-to-l from-blue-500 to-purple-600 shadow-lg hover:from-purple-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add users
        </button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                Create new user
              </h2>
              <form onSubmit={handleSignin}>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-300"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                    type="text"
                    name="fullName"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-300"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                    name="email"
                    id="email"
                    type="email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-300"
                    htmlFor="bio"
                  >
                    Password
                  </label>
                  <input
                    className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                    name="password"
                    id="password"
                    type="password"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                    type="submit"
                  >
                    {signinLoader ? <ButtonLoader /> : "Create an User"}
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto min-h-[60vh]">
          <table className="table h-auto ">
            {/* head */}
            <thead>
              <tr>
                <th className="text-white">userId</th>
                <th className="text-white">Name</th>
                <th className="text-white">Email</th>
                <th className="text-white">admin</th>
                <th className="text-white">Co-admin</th>
                <th className="text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data?.map((e) => (
                <tr key={e._id} className="border-b border-slate-500">
                  <th>{e._id}</th>
                  <td>{e.fullName}</td>
                  <td>{e.email}</td>
                  <td>{e.isAdmin}</td>
                  <td>{e.isCoAdmin}</td>

                  <td>
                    <div className="dropdown dropdown-left">
                      <button className="py-1 px-4 bg-cyan-700">Edit</button>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                      >
                        <li>
                          <a>Admin</a>
                        </li>
                        <li>
                          <a>Co-admin</a>
                        </li>
                        <li>
                          <a>Block</a>
                        </li>
                        <li className="text-red-400 font-bold">
                          <a>Delete</a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
