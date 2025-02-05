import React, { useEffect } from "react";
import { useLoginMutation } from "../rtkQuery/query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login as updateLogin } from "../redux/auth.slice";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../components/ButtonLoader";
const Signin = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [login, { data, isLoading, isError }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const credential = Object.fromEntries(formData.entries());

    if (!credential.email) return toast.error("Email has Required !");
    if (!credential.password) return toast.error("Password has Required !");

    const res = await login(credential);

    if (res?.error) return toast.error(res.error.data.message);

    dispatch(updateLogin());
    localStorage.setItem("auth", JSON.stringify(res?.data));

    navigate("/");
  };
  return (
    <div>
      <div className="flex justify-center my-auto items-center h-full w-full">
        <div className="grid gap-4 content-center">
          <section
            id="back-div"
            className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl my-8 m-2"
          >
            <div className="border border-transparent rounded-xl  bg-gray-900 shadow-xl p-6 m-2">
              <h1 className="text-2xl  font-bold text-center cursor-default dark:text-gray-300 ">
                Login
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-lg dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 "
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-lg dark:text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 "
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                  />
                </div>

                <button
                  className="w-full p-3 mt-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="submit"
                >
                  {isLoading ? <ButtonLoader /> : "LOG IN"}
                </button>
              </form>

              <div className="mt-4 text-center text-sm text-gray-500">
                <p>
                  By signing in, you agree to our
                  <a
                    href="#"
                    className="text-blue-400 transition hover:underline"
                  >
                    Terms
                  </a>
                  and
                  <a
                    href="#"
                    className="text-blue-400 transition hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Signin;
