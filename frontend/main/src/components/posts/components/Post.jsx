import { Link } from "react-router-dom";
import styles from "../Posts.module.css";

function Post({ link, post }) {
  return (
    <div className={styles.post}>
      <Link to={link}>{post.title}</Link>
      <h3>{post.createdAt}</h3>
    </div>
  );
}

export default Post;
