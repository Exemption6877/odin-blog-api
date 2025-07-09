import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import PostContent from "./components/PostContent";
import DeletePost from "./components/DeletePost";
import AuthContext from "../../context/AuthContext";
import EditPost from "./components/EditPost";
import styles from "./PostDetails.module.css";

const API_URL = import.meta.env.VITE_API_URL;

function PostDetails() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(false);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`${API_URL}/posts/${postId}`, {
          method: "GET",
        });

        if (!res.ok) {
          setLoading(false);
          setError(res.json());
        }
        const data = await res.json();
        setLoading(false);
        setPost(data);
      } catch (err) {
        setLoading(false);
        setError(err.msg);
      }
    }

    fetchPost();
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Post does not exist.</p>;

  return (
    <>
      <div className={styles.post}>
        <Link to={"/posts"}>{" < "}Go Back</Link>

        {editing ? (
          <EditPost post={post} token={token} />
        ) : (
          <PostContent post={post} />
        )}

        <div className={styles.postBtnWrapper}>
          <button onClick={toggleEdit} className={styles.postBtn}>
            Edit
          </button>
          <DeletePost postId={postId} token={token} />
        </div>
      </div>
      <Comments postId={postId} />
    </>
  );
}

export default PostDetails;
