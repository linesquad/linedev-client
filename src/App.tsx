import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { getCurrentUser } from "./services/auth";

function App() {
  const router = createRouter({
    routeTree,
    context: {
      getCurrentUser,
    },
  });
  return <RouterProvider router={router} />;
}

export default App;
