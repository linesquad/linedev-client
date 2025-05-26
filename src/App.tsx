import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./hooks/useAuth";

const router = createRouter({
  routeTree,
  context: {
    authentication: undefined!,
  },
});

function App() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ authentication: auth }} />;
}

export default App;
