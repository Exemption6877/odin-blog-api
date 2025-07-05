import { useContext } from "react";
import { useState } from "react";
import AuthContext from "../../../context/authContext";

function CommentEditor({ value, postId, commentId }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [content, setContent] = useState(value);

  const { token } = useContext(AuthContext);

  const handleTyping = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${API_URL}/posts/${postId}/comments/${commentId}`,
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

    if (res.status !== 200) {
      return new Error("error updating comment");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="updatedText"
          value={content}
          onChange={handleTyping}
        ></textarea>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default CommentEditor;
