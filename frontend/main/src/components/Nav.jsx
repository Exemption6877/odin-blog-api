import styles from "./Nav.module.css";

function Nav() {
  return (
    <nav>
      <ul className={styles.linksWrapper}>
        <li>
          <a href="">Sign Up</a>
        </li>
        <li>
          <a href="">Log In</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
