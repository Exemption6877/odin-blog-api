import { Outlet } from "react-router-dom";
import Nav from "./components/layout/nav";
import Footer from "./components/layout/Footer";
import styles from "./App.module.css";

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
