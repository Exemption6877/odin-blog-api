import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import useFetch from "../../../hooks/useFetch";
import Comments from "./components/Comments";
import AuthContext from "../../context/authContext";
import NewComment from "./components/NewComment";

const API_URL = import.meta.env.VITE_API_URL;

function PostDetails() {
  const { token, username } = useContext(AuthContext);
  const { postId } = useParams();
  const { error, loading, data } = useFetch(`${API_URL}/posts/${postId}`);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Post Not Found.</div>;

  return (
    <div>
      <Link to="/">Go back</Link>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      {token && <NewComment token={token} postId={postId} />}
      <Comments postId={postId} currentUser={username} />
    </div>
  );
}

export default PostDetails;
