import { useState, useEffect } from "react";
import NewComment from "./Components/NewComment";

const API_URL = import.meta.env.VITE_API_URL;

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
          method: "GET",
        });

        if (!res.ok) {
          setLoading(false);
          setError(res.json());
        }

        const data = await res.json();
        setLoading(false);
        setComments(data);
      } catch (err) {
        setError(err.msg);
        setLoading(false);
      }
    }

    fetchComments();
  }, [postId]);

  if (comments.length === 0) {
    return <p>No comments yet!</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Comments</h2>
      <NewComment postId={postId} />

      {comments.map((comment) => (
        <div>
          <p>{comment.user.username}</p>
          <p>{comment.createdAt}</p>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Comments;
