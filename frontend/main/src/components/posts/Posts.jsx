import useFetch from "../../../hooks/useFetch";
import Post from "./components/Post";
import AuthContext from "../../context/authContext";

function Posts() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { error, loading, data } = useFetch(`${API_URL}/posts`);

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Post Not Found.</p>;

  return (
    <div key={data.id}>
      {data.map((post) => (
        <Post
          key={post.id}
          link={`/posts/${post.id}`}
          title={post.title}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
}

export default Posts;
