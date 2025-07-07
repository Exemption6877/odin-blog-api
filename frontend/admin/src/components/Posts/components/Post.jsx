function Post({ post }) {
  return (
    <div>
      <p>{post.title}</p>
      <p>{post.createdAt}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default Post;
