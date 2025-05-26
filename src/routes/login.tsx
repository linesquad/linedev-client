import { createFileRoute } from "@tanstack/react-router";
import { isAuthenticated, signOut, signIn } from "../module/auth";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: AuthRoute,
});

function AuthRoute() {
  const [authLoad, setAuthLoad] = useState(false);
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Auth Page</h2>
      {isAuthenticated() ? (
        <div>
          <p>You are already logged in</p>
          <button
            onClick={() => {
              setAuthLoad(!authLoad);
              signOut();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
          <button
            onClick={() => {
              setAuthLoad(!authLoad);
              signIn();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}
