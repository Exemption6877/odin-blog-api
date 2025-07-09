import { useState } from "react";
import styles from "../Comments.module.css";

const API_URL = import.meta.env.VITE_API_URL;

function EditComment({ postId, commentId, token, prevValue }) {
  const [updatedContent, setUpdatedContent] = useState(prevValue);
  const [error, setError] = useState(null);

  const handleTyping = (e) => {
    const { name, value } = e.target;

    if (name === "updatedComment") setUpdatedContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${API_URL}/posts/${postId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            commentText: updatedContent,
          }),
        }
      );

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
    <form onSubmit={handleSubmit} className={styles.newComment}>
      <h3>Edit Comment:</h3>
      <input
        type="text"
        name="updatedComment"
        id="updatedComment"
        onChange={handleTyping}
        value={updatedContent}
      />
      {error && <p>Error: {error}</p>}
      <input type="submit" value="Edit Comment" />
    </form>
  );
}

export default EditComment;
