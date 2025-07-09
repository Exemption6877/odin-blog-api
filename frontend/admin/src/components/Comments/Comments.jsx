import { useState, useEffect } from "react";
import NewComment from "./Components/NewComment";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Comment from "./Components/Comment";

const API_URL = import.meta.env.VITE_API_URL;

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useContext(AuthContext);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Comments</h2>
      {comments.length === 0 && <p>No comments yet!</p>}
      <NewComment postId={postId} />

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          token={token}
          postId={postId}
        />
      ))}
    </div>
  );
}

export default Comments;
