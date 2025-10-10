import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { ProtectedRoutes } from "./components/ProtectedRoutes.jsx";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useGlobalContext } from "./hooks/useGlobalContext.jsx";
import Recipe from "./components/Recipe.jsx";

function App() {
  const { user, loading } = useGlobalContext();

  if (loading) return <p className="text-center mt-10">Yuklanmoqda...</p>;

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <Home />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/recipe",
      element: <Recipe />,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
