import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";

function Login() {
  const API_URL = import.meta.env.VITE_API_URL;

  const { login } = useContext(AuthContext);
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
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });

    if (res.status !== 200) {
      return new Error("incorrect credentials");
    }

    const data = await res.json();
    login(data.token, credentials.username);
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
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default Login;
