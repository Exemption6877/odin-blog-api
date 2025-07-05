import styles from "./App.module.css";
import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";
import { Outlet } from "react-router-dom";

import AuthContext from "./context/authContext";
import { useContext, useEffect } from "react";

function App() {
  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  });

  return (
    <div className={styles.appWrapper}>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
