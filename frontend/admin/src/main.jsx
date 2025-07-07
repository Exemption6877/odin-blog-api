import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import routes from "./routes.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider.jsx";
import App from "./App.jsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
