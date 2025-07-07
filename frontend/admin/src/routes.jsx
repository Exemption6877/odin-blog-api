import App from "../../admin/src/App";
import Login from "./components/Auth/Login";
import AuthRoute from "../../admin/src/ProtectedRoute";

const routes = [
  { path: "/", element: <Login /> },
  {
    path: "/posts",
    element: (
      <AuthRoute>
        <App />
      </AuthRoute>
    ),
  },
];
export default routes;
