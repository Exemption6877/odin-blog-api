import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Post does not exist.</p>;

  return (
    <>
      <div>
        <h2>{post.title}</h2>
        <p>{post.createdAt}</p>
        <p>{post.content}</p>
      </div>

      <h3>Comments</h3>
    </>
  );
}

export default PostDetails;
