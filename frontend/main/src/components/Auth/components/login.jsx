import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Error from "../../Error/Error";
import AuthContext from "../../../context/authContext";
import styles from "../Auth.module.css";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);

  const handleTyping = (e) => {
    const { name, value } = e.target;

    if (name !== "username" && name !== "password") {
      return;
    }

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.error);
      return;
    }

    const data = await res.json();
    login(data.token, credentials.username);
    navigate("/", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formBlock}>
      <h2>Log In</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        onChange={handleTyping}
        value={credentials.username}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={handleTyping}
        value={credentials.password}
      />
      {error && <Error msg={error} />}

      <input type="submit" value="Log In" />
      <p>
        Do not have an account?{" "}
        <Link to="/auth/signup" className={styles.authLink}>
          Sign Up
        </Link>
      </p>
    </form>
  );
}

export default Login;
