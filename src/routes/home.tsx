import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../components/main/HomePage";

export const Route = createFileRoute("/home")({
  component: Home,
});

function Home() {
  return <HomePage />;
}
