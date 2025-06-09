import { getUserRole } from "../services/auth";
import { getCurrentUser } from "../services/auth";

const role = await getUserRole().catch(() => null);
const user = await getCurrentUser().catch(() => null);

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/profile", label: "Profile" },
  { to: user ? `/${role}Dashboard` : "/signin", label: "Dashboard" },
  { to: role === "senior" ? "/blog" : "/signin", label: "Blog" },
];
