import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import styles from "./Layout.module.css";

function Nav() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <h3>The Admin Panel</h3>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Nav;
