import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/(dashboard)/clientDashboard"
)({
  component: ClientDashboard,
  loader: async ({ context }) => {
    const role = await context.getUserRole().catch(() => null);
    if (role !== "client") {
      throw redirect({ to: `/${role}Dashboard` });
    }
  },
});

function ClientDashboard() {
  return <div>Hello "/_authenticated/(dashboard)/clientDashboard"!</div>;
}
