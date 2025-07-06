import { useState } from "react";

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
