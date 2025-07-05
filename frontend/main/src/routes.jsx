import { Navigate } from "react-router-dom";
import App from "./App";
import Posts from "./components/Posts/Posts";
import PostDetails from "./components/PostDetails/PostDetails";
import Login from "./components/auth/login";
import Auth from "./Auth";
import Signup from "./components/auth/signup";

const routes = [
  { path: "/", element: <Navigate to="/posts" replace /> },
  {
    path: "/posts",
    element: <App />,
    children: [
      { index: true, element: <Posts /> },
      { path: ":postId", element: <PostDetails /> },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      { index: false },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
];

export default routes;
