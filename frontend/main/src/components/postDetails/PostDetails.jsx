import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Comments from "./components/Comments";

function PostDetails() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { postId } = useParams();
  const { error, loading, data } = useFetch(`${API_URL}/posts/${postId}`);
  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Post Not Found.</div>;

  //

  return (
    <div key={data.id}>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <Comments />
    </div>
  );
}

export default PostDetails;
