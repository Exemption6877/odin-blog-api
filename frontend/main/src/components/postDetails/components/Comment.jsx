import { useState } from "react";
import CommentEditor from "./CommentEditor";

function Comment({ comment, currentUser }) {
  const isOwner = comment.user.username === currentUser;
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };
  return (
    <div>
      <p>{comment.user.username}</p>
      <p>{comment.content}</p>
      {edit && <CommentEditor comment={comment} />}
      {isOwner && <button onClick={toggleEdit}>Edit</button>}
    </div>
  );
}

export default Comment;
