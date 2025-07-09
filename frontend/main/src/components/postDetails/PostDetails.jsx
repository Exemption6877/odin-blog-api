import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import useFetch from "../../../hooks/useFetch";
import Comments from "./components/Comments";
import AuthContext from "../../context/AuthContext";
import NewComment from "./components/NewComment";
import styles from "./PostDetails.module.css";
import Error from "../Error/Error";

const API_URL = import.meta.env.VITE_API_URL;

function PostDetails() {
  const { token, username } = useContext(AuthContext);
  const { postId } = useParams();
  const { error, loading, data } = useFetch(`${API_URL}/posts/${postId}`);

  if (loading) return <div>Loading...</div>;
  if (!data) return <Error msg={error} />;

  return (
    <>
      {error && <Error msg={error} />}
      <div className={styles.postDetailsBlock}>
        <Link to="/">Go back</Link>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
      </div>
      {token && <NewComment token={token} postId={postId} />}
      <Comments postId={postId} currentUser={username} />
    </>
  );
}

export default PostDetails;
