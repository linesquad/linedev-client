import { createFileRoute, redirect } from '@tanstack/react-router'


export const Route = createFileRoute(
  '/_authenticated/(dashboard)/middleDashboard',
)({
  component: MiddleDashboard,
  loader: async ({ context }) => {
    const role = await context.getUserRole().catch(() => null);
    if (role !== "middle") {
      throw redirect({ to: `/${role}Dashboard`  });
    }
  },
})

function MiddleDashboard() {
  return <div>Hello "/_authenticated/(dashboard)/middleDashboard"!</div>
}
