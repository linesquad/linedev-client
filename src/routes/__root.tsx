import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { logout, type User } from "../services/auth";
import toast from "react-hot-toast";
import Header from "../components/main/Header";

export const Route = createRootRouteWithContext<User>()({
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
  console.log("User:", user);
  console.log("Role:", role);
  return (
    <React.Fragment>
      <Header user={user} role={role} onLogout={handleLogout} />

      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
}
