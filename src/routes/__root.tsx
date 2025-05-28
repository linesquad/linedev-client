import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { logout, type User } from "../services/auth";
import toast from "react-hot-toast";
import Header from "../components/main/Header";

export const Route = createRootRouteWithContext<User>()({
  component: RootComponent,
  loader: async ({ context }) => {
    const user = await context.getCurrentUser().catch(() => null);
    return { user };
  },
});

function RootComponent() {
  const { user } = Route.useLoaderData();

  const handleLogout = React.useCallback(() => {
    React.startTransition(async () => {
      await logout();
      toast.success("Logged out successfully");
      window.location.href = "/home";
    });
  }, []);

  return (
    <React.Fragment>
      <Header user={user} onLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
}
