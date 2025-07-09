import { useState } from "react";
import DelCommentBtn from "./DelCommentBtn";
import EditComment from "./EditComment";

function Comment({ comment, token, postId }) {
  const [editing, setEditing] = useState(false);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  return (
    <div>
      {editing ? (
        <EditComment
          postId={postId}
          commentId={comment.id}
          token={token}
          prevValue={comment.content}
        />
      ) : (
        <div>
          <p>{comment.user.username}</p>
          <p>{comment.createdAt}</p>
          <p>{comment.content}</p>
        </div>
      )}

      <div>
        <button onClick={toggleEdit}>Edit</button>
        <DelCommentBtn token={token} commentId={comment.id} postId={postId} />
      </div>
    </div>
  );
}
export default Comment;
