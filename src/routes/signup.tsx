import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState, useTransition } from "react";
import { getCurrentUser, signUp } from "../services/auth";
import toast from "react-hot-toast";

export const Route = createFileRoute("/signup")({
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      action={() => {
        startTransition(async () => {
          try {
            await signUp(name!, email, password);
            toast.success("Register successful, please login");
            navigate({ to: "/home" });
          } catch (error) {
            toast.error("Register failed, please try again");
            console.error(error);
          }
        });
      }}
      className="space-y-4 p-4"
    >
      <h1 className="text-xl font-bold">Register</h1>
      <input
        className="border p-2 w-full"
        placeholder="Name"
        value={name!}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button disabled={pending} className="bg-green-500 text-white px-4 py-2">
        Register
      </button>
    </form>
  );
}