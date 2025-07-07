import Post from "./components/Post";

function Posts() {
  const posts = [];

  if (posts.length === 0) {
    return <p>No posts yet!</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
