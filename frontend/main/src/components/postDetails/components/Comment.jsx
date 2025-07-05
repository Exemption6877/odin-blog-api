import CommentEditor from "./CommentEditor";
import { useState } from "react";

function Comment({ username, content, currentUser, commentId, postId }) {
  const isOwner = username === currentUser;
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };
  return (
    <div>
      <p>{username}</p>
      <p>{content}</p>
      {edit && (
        <CommentEditor value={content} commentId={commentId} postId={postId} />
      )}
      {isOwner && <button onClick={toggleEdit}>Edit</button>}
    </div>
  );
}

export default Comment;
