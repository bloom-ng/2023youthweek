/* eslint-disable no-unused-vars */
import React from "react";
import ApiService from "../services/ApiService";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    let response = await ApiService.Login(email, password);
    console.log(response, "response Auth");
    if (response?.response?.data?.errors) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: response.response.data.message,
        // timer: 2000,
      });
      setLoading(false);
    } else {
      console.log(response);
      dispatch({
        type: "LOGIN",
        payload: response,
      });
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setLoading(false);
      setSuccess(true);
      // return navigate('/invoice');
      // location.reload();
    }
  };

  return (
    <>
      {success && <Navigate to="/dashboard" replace={true} />}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto hidden"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to continue
            </h2>
          </div>
          <form className="mt-8 space-y-12" onSubmit={handleLogin}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className=" space-y-px rounded-md shadow-sm">
              <div className="py-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className=" items-center justify-between hidden">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-gradient-to-r from-orange-500 to-purple-900 text-white py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Signing In" : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
