import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Comments from "./components/Comments";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { useContext } from "react";
import NewComment from "./components/NewComment";

function PostDetails() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { token } = useContext(AuthContext);
  const { postId } = useParams();
  const { error, loading, data } = useFetch(`${API_URL}/posts/${postId}`);
  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Post Not Found.</div>;

  return (
    <div key={data.id}>
      <Link to="/">Go back</Link>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      {token && <NewComment token={token} postId={postId} />}
      <Comments postId={postId} />
    </div>
  );
}

export default PostDetails;
