import App from "../../admin/src/App";
import Login from "./components/Auth/Login";
import AuthRoute from "../../admin/src/ProtectedRoute";
import Posts from "./components/Posts/Posts";

const routes = [
  { path: "/", element: <Login /> },
  {
    path: "/posts",
    element: (
      <AuthRoute>
        <App />
      </AuthRoute>
    ),
    children: [{ index: true, element: <Posts /> }, { path: ":postId" }],
  },
];
export default routes;
