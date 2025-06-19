import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { getCurrentUser, getUserRole, logout } from "../services/auth";
import toast from "react-hot-toast";
import Header from "../components/main/Header";

export const Route = createRootRouteWithContext<{
  getCurrentUser: typeof getCurrentUser;
  getUserRole: typeof getUserRole;
}>()({
  component: RootComponent,
  loader: async ({ context }) => {
    const user = await context.getCurrentUser().catch(() => null);
    const role = user ? await context.getUserRole().catch(() => null) : null;
    return { user, role };
  },
});

function RootComponent() {
  const { user, role } = Route.useLoaderData();

  const handleLogout = React.useCallback(() => {
    React.startTransition(async () => {
      await logout();
      toast.success("Logged out successfully");
      window.location.href = "/";
    });
  }, []);

  return (
    <React.Fragment>
      <Header user={user} role={role} onLogout={handleLogout} />

      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
}
