import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useAuth } from "../provider/authProvider.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

//imported jsx for paths
import Homepage from "./Homepage.jsx";
import SearchContainer from "../containers/searchContainer.jsx";
import UserPage from "./userpage.jsx";
import Login from "./login.jsx";
import SignUp from "./signup.jsx";

function MainRoutes() {
  //retrieve the token val from the authentication context
  const { token } = useAuth();
  //define public routes assesible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/search",
      element: <SearchContainer />,
    },
  ];
  const routesForAuthenticatedUsers = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/:username",
          element: <UserPage />,
        },
        {
          path: "/profile",
          element: <p>User Profile </p>,
        },
        {
          path: "/logout",
          element: <p>Logout</p>,
        },
      ],
    },
  ];
  const routesForNonAuthenticatedUsers = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ];
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNonAuthenticatedUsers : []),
    ...routesForAuthenticatedUsers,
  ]);
  return <RouterProvider router={router} />;
}

export default MainRoutes;
