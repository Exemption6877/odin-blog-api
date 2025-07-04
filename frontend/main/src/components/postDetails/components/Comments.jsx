import useFetch from "../../../../hooks/useFetch";
import Comment from "./Comment";

function Comments({ postId }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const { error, loading, data } = useFetch(
    `${API_URL}/posts/${postId}/comments`
  );

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;
  if (!data || data.length === 0) return <div>Comment Not Found.</div>;

  return (
    <div>
      <h3>Comments</h3>
      {data.map((comment) => (
        <Comment key={comment.id} content={comment.content} />
      ))}
    </div>
  );
}

export default Comments;
