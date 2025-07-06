import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";

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
