import useFetch from "../../../../hooks/useFetch";
import Comment from "./Comment";
import styles from "./Comments.module.css";

const API_URL = import.meta.env.VITE_API_URL;

function Comments({ postId, currentUser }) {
  const { error, loading, data } = useFetch(
    `${API_URL}/posts/${postId}/comments`
  );

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;
  if (!data || data.length === 0) return <div>Comment Not Found.</div>;

  return (
    <div className={styles.commentsBlock}>
      <h3>Comments</h3>
      {data.map((comment) => (
        <Comment key={comment.id} comment={comment} currentUser={currentUser} />
      ))}
    </div>
  );
}

export default Comments;
