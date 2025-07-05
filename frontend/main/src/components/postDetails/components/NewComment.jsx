import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function NewComment({ token, postId }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const handleTyping = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    // I could make this more responsive if API could return commentId,
    // To show comment without updating the whole page, but I will leave it for now.
    const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        commentText: content,
      }),
    });

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
        name="commentText"
        id="commentText"
        value={content}
        onChange={handleTyping}
      ></textarea>
      <input type="submit" value="submit" />
    </form>
  );
}

export default NewComment;
