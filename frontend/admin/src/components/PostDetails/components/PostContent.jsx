function PostContent(post) {
  return (
    <>
      <h2>{post.title}</h2>
      <p>{String(post.published)}</p>
      <p>{post.createdAt}</p>
      <p>{post.content}</p>
    </>
  );
}

export default PostContent;
