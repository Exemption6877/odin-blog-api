import { Navigate } from "react-router-dom";
import App from "./App";
import Posts from "./components/Posts/Posts";
import PostDetails from "./components/PostDetails/PostDetails";

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
