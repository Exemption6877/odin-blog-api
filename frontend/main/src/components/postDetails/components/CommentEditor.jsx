import { useState, useContext } from "react";
import AuthContext from "../../../context/authContext";

const API_URL = import.meta.env.VITE_API_URL;

function CommentEditor({ comment }) {
  const [content, setContent] = useState(comment.content);
  const [error, setError] = useState(null);

  const { token } = useContext(AuthContext);

  const handleTyping = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    const res = await fetch(
      `${API_URL}/posts/${comment.postId}/comments/${comment.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          commentText: content,
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.error);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <textarea
        name="updatedText"
        value={content}
        onChange={handleTyping}
      ></textarea>
      <input type="submit" value="submit" />
    </form>
  );
}

export default CommentEditor;
