import { Outlet } from "react-router-dom";
import styles from "./Auth.module.css";

function Auth() {
  return (
    <div className={styles.authWrapper}>
      <Outlet />
    </div>
  );
}

export default Auth;
