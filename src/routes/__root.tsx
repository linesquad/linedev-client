import * as React from "react";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { logout, type User } from "../services/auth";
import toast from "react-hot-toast";

export const Route = createRootRouteWithContext<User>()({
  component: RootComponent,
  loader: async ({ context }) => {
    const user = await context.getCurrentUser().catch(() => null);
    console.log(user);
    return { user };
  },
});

function RootComponent() {
  const { user } = Route.useLoaderData();

  return (
    <React.Fragment>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800">LineDev</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/home"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
              >
                Profile
              </Link>
              
              {user ? (
                <button
                  onClick={() => {
                    React.startTransition(async () => {
                      await logout();
                      toast.success("Logged out successfully");
                      window.location.href = "/home";
                    });
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition duration-150"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
}
