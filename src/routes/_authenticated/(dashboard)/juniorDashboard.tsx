import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/(dashboard)/juniorDashboard',
)({
  component: JuniorDashboard,
  loader: async ({ context }) => {
    const role = await context.getUserRole().catch(() => null);
    if (role !== "junior") {
      throw redirect({ to: `/${role}Dashboard` });
    }
  },
})

function JuniorDashboard() {
  return <div>Hello "/_authenticated/(dashboard)/juniorDashboard"!</div>
}
