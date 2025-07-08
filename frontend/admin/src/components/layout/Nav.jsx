import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function Nav() {
  const { logout } = useContext(AuthContext);

  return (
    <nav>
      <h3>The Admin Panel</h3>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Nav;
