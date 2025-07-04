import { useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";

function PostDetails() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { postId } = useParams();
  const post = useFetch(`${API_URL}/posts/${postId}`);
  const comments = useFetch(`${API_URL}/posts/${postId}/comments`);
  if (post.error) return <div>Error: {post.error}</div>;
  if (post.loading) return <div>Loading...</div>;
  if (!post.data) return <div>Post Not Found.</div>;

  if (!comments.data) return <div>Comment Not Found.</div>;
  //

  return (
    <div key={post.data.id}>
      <h2>{post.data.title}</h2>
      <p>{post.data.content}</p>

      <div className="comments">
        {comments.data.map((comment) => (
          <div key={comment.id}>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostDetails;
