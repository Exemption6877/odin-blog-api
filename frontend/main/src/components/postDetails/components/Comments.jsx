import { useContext } from "react";
import useFetch from "../../../../hooks/useFetch";
import Comment from "./Comment";
import AuthContext from "../../../context/authContext";

function Comments({ postId }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const { error, loading, data } = useFetch(
    `${API_URL}/posts/${postId}/comments`
  );

  const { username } = useContext(AuthContext);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;
  if (!data || data.length === 0) return <div>Comment Not Found.</div>;

  return (
    <div>
      <h3>Comments</h3>
      {data.map((comment) => (
        <Comment
          key={comment.id}
          content={comment.content}
          username={comment.user.username}
          currentUser={username}
          commentId={comment.id}
          postId={postId}
        />
      ))}
    </div>
  );
}

export default Comments;
