import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function DelCommentBtn({ postId, commentId, token }) {
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      const res = await fetch(
        `${API_URL}/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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

  return <button onClick={handleClick}>{error ? error : "Delete"}</button>;
}

export default DelCommentBtn;
