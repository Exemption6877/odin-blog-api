import { useState } from "react";

function NewComment({ token, postId }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const [content, setContent] = useState("");
  const handleTyping = (e) => {
    const { name, value } = e.target;

    if (name === "commentText") {
      setContent(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token);
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
    if (res.status !== 200) {
      return new Error("error creating comment");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="commentText"
          id="commentText"
          value={content}
          onChange={handleTyping}
        ></textarea>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default NewComment;
