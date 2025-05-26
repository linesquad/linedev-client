import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const user = await context.getCurrentUser().catch(() => null);
    if (!user) {
      throw redirect({ to: "/signin" });
    }
  },
});