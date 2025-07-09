import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Comments from "../Comments/Comments";

const API_URL = import.meta.env.VITE_API_URL;

function PostDetails() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <h2>{post.title}</h2>
        <p>{String(post.published)}</p>
        <p>{post.createdAt}</p>
        <p>{post.content}</p>
      </div>
      <Comments postId={postId} />
    </>
  );
}

export default PostDetails;
