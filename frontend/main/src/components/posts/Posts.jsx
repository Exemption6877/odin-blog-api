import useFetch from "../../../hooks/useFetch";
import Post from "./components/Post";

const API_URL = import.meta.env.VITE_API_URL;

function Posts() {
  const { error, loading, data } = useFetch(`${API_URL}/posts`);

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Post Not Found </p>;

  return (
    <div>
      {data.map((post) => (
        <Post key={post.id} link={`/posts/${post.id}`} post={post} />
      ))}
    </div>
  );
}

export default Posts;
