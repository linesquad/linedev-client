import { createFileRoute, redirect } from "@tanstack/react-router";
import MainBlog from "../../../components/blog/MainBlog";

export const Route = createFileRoute(
  "/_authenticated/(dashboard)/seniorDashboard"
)({
  component: SeniorDashboard,
  loader: async ({ context }) => {
    const role = await context.getUserRole().catch(() => null);
    if (role !== "senior") {
      throw redirect({ to: `/${role}Dashboard` });
    }
  },
});

function SeniorDashboard() {
  return <Blog />;
}

function Blog() {
  return <MainBlog />;
}
