import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

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

    const res = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    console.log(res);
  };

  return (
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

      <input type="submit" value="Submit" />
    </form>
  );
}

export default Login;
