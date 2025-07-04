import styles from "./App.module.css";
import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className={styles.appWrapper}>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
