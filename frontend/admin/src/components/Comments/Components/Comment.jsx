import { useState } from "react";
import DelCommentBtn from "./DelCommentBtn";
import EditComment from "./EditComment";
import styles from "../Comments.module.css";

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

      <div className={styles.commentBtnWrapper}>
        <button onClick={toggleEdit} className={styles.commentBtn}>
          Edit
        </button>
        <DelCommentBtn token={token} commentId={comment.id} postId={postId} />
      </div>
    </div>
  );
}
export default Comment;
