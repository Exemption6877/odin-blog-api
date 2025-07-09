import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function EditPost({ token, post }) {
  const [updatedContent, setUpdatedContent] = useState(post);
  const [error, setError] = useState(null);

  const handleTyping = (e) => {
    const { name, value, type, checked } = e.target;

    setUpdatedContent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: updatedContent.title,
          published: updatedContent.published,
          content: updatedContent.content,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error);
        return;
      }

      window.location.reload();
    } catch (err) {
      setError(err.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit post:</h3>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        onChange={handleTyping}
        value={updatedContent.title}
      />
      <label htmlFor="published">Publish?</label>
      <input
        type="checkbox"
        name="published"
        id="published"
        onChange={handleTyping}
        checked={updatedContent.title}
      />
      <label htmlFor="content">Content</label>
      <input
        type="text"
        name="content"
        id="content"
        onChange={handleTyping}
        value={updatedContent.content}
      />
      {error && <p>Error: {error}</p>}
      <input type="submit" value="Edit post" />
    </form>
  );
}

export default EditPost;
