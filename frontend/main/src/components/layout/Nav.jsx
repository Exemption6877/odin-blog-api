import styles from "./Nav.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/authContext";

function Nav() {
  const { username, token, logout } = useContext(AuthContext);
  return (
    <nav>
      <ul className={styles.linksWrapper}>
        <li>
          <Link to="/">Home</Link>
        </li>

        {token ? (
          <>
            <li>{username}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/auth/login">Log In</Link>
            </li>
            <li>
              <Link to="/auth/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
