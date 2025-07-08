import App from "../../admin/src/App";
import Login from "./components/Auth/Login";
import AuthRoute from "../../admin/src/ProtectedRoute";
import Posts from "./components/Posts/Posts";
import PostDetails from "./components/PostDetails/PostDetails";

const routes = [
  { path: "/", element: <Login /> },
  {
    path: "/posts",
    element: (
      <AuthRoute>
        <App />
      </AuthRoute>
    ),
    children: [
      { index: true, element: <Posts /> },
      { path: ":postId", element: <PostDetails /> },
    ],
  },
];
export default routes;
