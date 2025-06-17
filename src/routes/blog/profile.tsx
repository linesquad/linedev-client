import { createFileRoute } from "@tanstack/react-router";
import Profile from "../../components/blog/Profile";

export const Route = createFileRoute("/blog/profile")({
  component: () => <Profile />,
});
