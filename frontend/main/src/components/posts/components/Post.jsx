import { Link } from "react-router-dom";

function Post({ link, title, createdAt }) {
  return (
    <div>
      <Link to={link}>{title}</Link>
      <h3>{createdAt}</h3>
    </div>
  );
}

export default Post;
