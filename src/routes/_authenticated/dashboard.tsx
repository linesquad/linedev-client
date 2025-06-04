import { createFileRoute } from '@tanstack/react-router';
import { getDashboard } from '../../services/dashboard';
import { useLoaderData } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/dashboard')({
  loader: async ({ context }) => {
    const role = await context.getUserRole().catch(() => null);
    if (!role) throw new Error("No user found.");
    return getDashboard(role);
  },
  component: DashboardComponent,
});

function DashboardComponent() {
  const dashboardData = useLoaderData({ from: Route.id });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      {dashboardData.message}
    </div>
  );
}
