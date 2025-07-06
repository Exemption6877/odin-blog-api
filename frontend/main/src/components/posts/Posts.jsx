import useFetch from "../../../hooks/useFetch";
import Post from "./components/Post";
import styles from "./Posts.module.css";
import Error from "../Error/Error";

const API_URL = import.meta.env.VITE_API_URL;

function Posts() {
  const { error, loading, data } = useFetch(`${API_URL}/posts`);

  if (loading) return <p>Loading...</p>;
  if (!data) return <Error msg={error} />;

  return (
    <div className={styles.postsWrapper}>
      {error && <Error msg={error} />}
      {data.map((post) => (
        <Post key={post.id} link={`/posts/${post.id}`} post={post} />
      ))}
    </div>
  );
}

export default Posts;
