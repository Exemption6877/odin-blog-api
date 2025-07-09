import { useState } from "react";
import Post from "./components/Post";
import { useEffect } from "react";
import NewPost from "./components/NewPost";
import styles from "./Posts.module.css";

const API_URL = import.meta.env.VITE_API_URL;

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${API_URL}/posts/`, {
          method: "GET",
        });

        if (!res.ok) {
          const error = await res.json();
          setLoading(false);
          setError(error.error);
        }

        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err.msg);
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.postsWrapper}>
      <NewPost />

      {posts.length === 0 && <p>No posts yet!</p>}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
