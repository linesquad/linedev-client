import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { getCurrentUser, signIn, getUserRole } from "../services/auth";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
  loader: async () => {
    const user = await getCurrentUser().catch(() => null);
    const role = await getUserRole().catch(() => null);
    if (user) {
      throw redirect({ to: `/${role}Dashboard` });
    } 
    return {user, role};
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className=" flex items-center justify-center py-[100px] px-4 sm:px-6 lg:px-8 bg-[#0E5F8C]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm ">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
          <p className="mt-2 text-gray-500">Welcome back</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            startTransition(async () => {
              try {
                const response = await signIn(email, password);
                if(response){
                  navigate({ to: `/${response.role}Dashboard` });
                  toast.success("Login successful");
                }
              } catch (error) {
                console.error(error);
                setError("Invalid email or password");
                toast.error("Invalid email or password");
              }
            });
          }}
          className="mt-8 space-y-6"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/forgot-password" })}
                  className="text-sm text-pink-400 hover:text-pink-500"
                >
                  Forget password ?
                </button>
              </div>
              <div className="mt-1 relative">
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={rememberPassword}
                onChange={(e) => setRememberPassword(e.target.checked)}
                className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-500">
                Remember password ?
              </label>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 cursor-pointer"
          >
            Sign In
          </button>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or Sign In With
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-lg bg-violet-50 hover:bg-violet-100"
              >
                <FcGoogle className="text-xl" />
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-lg bg-violet-50 hover:bg-violet-100"
              >
                <MdEmail className="text-xl text-violet-500" />
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-lg bg-violet-50 hover:bg-violet-100"
              >
                <FaFacebook className="text-xl text-violet-500" />
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Dont have an account?{" "}
            <button
              type="button"
              onClick={() => navigate({ to: "/signup" })}
              className="font-medium text-violet-500 hover:text-violet-600 hover:underline cursor-pointer"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
