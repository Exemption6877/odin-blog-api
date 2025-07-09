import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import PostContent from "./components/PostContent";
import DeletePost from "./components/DeletePost";
import AuthContext from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function PostDetails() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div>
        <Link to={"/posts"}>Go Back</Link>
        <PostContent post={post} />

        <div>
          <DeletePost postId={postId} token={token} />
        </div>
      </div>
      <Comments postId={postId} />
    </>
  );
}

export default PostDetails;
