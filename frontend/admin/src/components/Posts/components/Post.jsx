import { Link } from "react-router-dom";
import styles from "../Posts.module.css";

function Post({ post }) {
  return (
    <div className={styles.post}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
      <p>{post.published ? "Published" : "Not Published"}</p>
      <p>{post.createdAt}</p>
    </div>
  );
}

export default Post;
