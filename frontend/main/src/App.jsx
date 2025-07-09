import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Footer from "./components/Layout/Footer";
import Nav from "./components/Layout/Nav";

function App() {
  return (
    <div className={styles.appWrapper}>
      <Nav />
      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
