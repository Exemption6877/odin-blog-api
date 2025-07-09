import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function NewComment({ postId }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  const { token } = useContext(AuthContext);

  const handleTyping = (e) => {
    const { name, value } = e.target;

    if (name === "commentContent") setComment(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = fetch(`${API_URL}/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          commentText: comment,
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
      <input
        type="text"
        name="commentContent"
        id="commentContent"
        onChange={handleTyping}
        value={comment}
      />
      <input type="submit" value="Create new comment" />
    </form>
  );
}

export default NewComment;
