// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import VerifyEmail from "./components/VerifyEmail.jsx";
import ProjectsList from "./components/ProjectsList.jsx";
import Project from "./components/Project.jsx";
import ProjectDetails from "./components/ProjectDetails.jsx";
import Layout from "./layouts/Layout.jsx";

export const router = createBrowserRouter([
  { path: "/auth", element: <Auth /> },
  { path: "/verify-email", element: <VerifyEmail /> },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "profile", element: <Profile /> },
      { path: "projects", element: <ProjectsList /> },
      { path: "projects/new", element: <Project /> },
      { path: "projects/:id", element: <ProjectDetails /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
