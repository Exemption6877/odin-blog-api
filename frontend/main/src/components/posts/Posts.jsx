import useFetch from "../../../hooks/useFetch";

function Posts() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { error, loading, data } = useFetch(`${API_URL}/posts`);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Post Not Found.</div>;

  return (
    <div key={data.id}>
      {data.map((post) => (
        <div className="post" key={post.id}>
          <p>{post.id}</p>
          <p>{post.title}</p>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Posts;
