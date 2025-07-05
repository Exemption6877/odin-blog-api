import styles from "./Nav.module.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul className={styles.linksWrapper}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="/auth/signup">Sign Up</a>
        </li>
        <li>
          <a href="/auth/login">Log In</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
