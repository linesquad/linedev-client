import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { getCurrentUser, signIn } from "../services/auth";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
  loader: async () => {
    const user = await getCurrentUser().catch(() => null);
    if (user) {
      return redirect({ to: "/home" });
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={() => {
        startTransition(async () => {
          try {
            await signIn(email, password);
            toast.success("Login successful");
            navigate({ to: "/home" });
          } catch (error) {
            console.error(error);
            setError("Invalid email or password");
            toast.error("Invalid email or password");
          }
        });
      }}
      className="space-y-4 p-4"
    >
      <h1 className="text-xl font-bold">Login</h1>
      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={pending} className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}