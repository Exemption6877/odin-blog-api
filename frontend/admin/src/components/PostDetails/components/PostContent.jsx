function PostContent({ post }) {
  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.published ? "Published" : "Not Published"}</p>
      <p>{post.createdAt}</p>
      <p>{post.content}</p>
    </>
  );
}

export default PostContent;
