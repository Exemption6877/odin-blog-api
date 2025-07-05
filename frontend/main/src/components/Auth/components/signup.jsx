import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState(null);

  const handleTyping = (e) => {
    const { name, value } = e.target;

    if (
      name !== "username" &&
      name !== "password" &&
      name !== "confirmpassword"
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

    if (credentials.password !== credentials.confirmpassword) {
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
    <>
      {error && <p>{error}</p>}
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

        <input
          type="password"
          name="confirmpassword"
          onChange={handleTyping}
          value={credentials.confirmpassword}
        />
        <input type="submit" value="submit" />
      </form>
    </>
  );
}

export default Signup;
