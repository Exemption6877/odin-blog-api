import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleTyping = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      setCredentials((prev) => ({
        ...prev,
        username: value,
      }));
    }

    if (name === "password") {
      setCredentials((prev) => ({
        ...prev,
        password: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });

    if (res.status !== 200) {
      return new Error("Cannot sign up this user.");
    }

    navigate("/auth/login", { replace: true });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleTyping}
          value={credentials.username}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleTyping}
          value={credentials.password}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default Signup;
