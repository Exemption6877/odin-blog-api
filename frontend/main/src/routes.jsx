import { Navigate } from "react-router-dom";
import App from "./App";
import Posts from "./components/Posts";
import PostDetails from "./components/Main/components/PostDetails";

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
];

export default routes;
