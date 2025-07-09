import { useState, useEffect } from "react";
import NewComment from "./Components/NewComment";
import DelCommentBtn from "./Components/DelCommentBtn";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

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

  if (comments.length === 0) {
    return <p>No comments yet!</p>;
  }

  return (
    <div>
      <h2>Comments</h2>
      <NewComment postId={postId} />

      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.user.username}</p>
          <p>{comment.createdAt}</p>
          <p>{comment.content}</p>
          <div>
            <DelCommentBtn
              commentId={comment.id}
              postId={postId}
              token={token}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
