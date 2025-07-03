import useFetch from "../../hooks/useFetch";

function Posts() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { error, loading, data } = useFetch(`${API_URL}/posts`);

  return (
    <div>
      {loading && <div>Loading posts...</div>}
      {error && <div>Error</div>}
      {!data && <div>No posts found.</div>}

      {!loading &&
        !error &&
        (!data || data.length === 0 ? (
          <div>No posts found.</div>
        ) : (
          data.map((post) => (
            <div className="post" key={post.id}>
              <p>{post.id}</p>
              <p>{post.title}</p>
              <p>{post.content}</p>
            </div>
          ))
        ))}
    </div>
  );
}

export default Posts;
