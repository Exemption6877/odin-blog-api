import { Link } from "react-router-dom";

function Post({ link, post }) {
  return (
    <div>
      <Link to={link}>{post.title}</Link>
      <h3>{post.createdAt}</h3>
    </div>
  );
}

export default Post;
