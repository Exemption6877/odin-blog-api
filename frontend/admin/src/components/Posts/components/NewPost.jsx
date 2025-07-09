import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function NewPost() {
  const [post, setPost] = useState({
    title: "",
    published: false,
    content: "",
  });

  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  const handleTyping = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "title" || name === "published" || name === "content") {
      setPost((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: post.title,
          published: post.published,
          content: post.content,
        }),
      });

      if (!res.ok) {
        const data = res.json();
        setError(data.error);
      }
    } catch (err) {
      setError(err.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        
      <h2>Create new post</h2>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        onChange={handleTyping}
        value={post.title}
      />
      <label htmlFor="published">Publish?</label>
      <input
        type="checkbox"
        name="published"
        id="published"
        onChange={handleTyping}
        value={post.published}
      />
      <label htmlFor="content">Content</label>
      <input
        type="text"
        name="content"
        id="content"
        onChange={handleTyping}
        checked={post.content}
      />
      {error && <p>Error: {error}</p>}
      <input type="submit" value="Create new post" />
    </form>
  );
}

export default NewPost;
