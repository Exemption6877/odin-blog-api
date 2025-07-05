import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../Auth.module.css";

const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleTyping = (e) => {
    const { name, value } = e.target;

    if (
      name !== "username" &&
      name !== "password" &&
      name !== "confirmPassword"
    ) {
      return;
    }

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      setError("Password does not match.");
      return;
    }

    const res = await fetch(`${API_URL}/signup`, {
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

    navigate("/auth/login", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formBlock}>
      {error && <p>{error}</p>}
      <h2>Sign Up</h2>
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
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        onChange={handleTyping}
        value={credentials.confirmPassword}
      />
      <input type="submit" value="Sign Up" />
      <p>
        Already registered?{" "}
        <Link to="/auth/login" className={styles.authLink}>
          Log In
        </Link>
      </p>
    </form>
  );
}

export default Signup;
