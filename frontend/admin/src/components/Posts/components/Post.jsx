import { Link } from "react-router-dom";

function Post({ post }) {
  return (
    <div>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
      <p>{String(post.published)}</p>
      <p>{post.createdAt}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default Post;
