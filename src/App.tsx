import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { getCurrentUser, getUserRole } from "./services/auth";

function App() {
  const router = createRouter({
    routeTree,
    context: {
      getCurrentUser,
      getUserRole,
    },
  });
  return <RouterProvider router={router} />;
}

export default App;
