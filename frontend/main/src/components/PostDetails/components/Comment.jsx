import { useState } from "react";
import CommentEditor from "./CommentEditor";
import styles from "./Comments.module.css";

function Comment({ comment, currentUser }) {
  const isOwner = comment.user.username === currentUser;
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };
  return (
    <div className={styles.comment}>
      <h3>{comment.user.username}</h3>
      {!edit && <p>{comment.content}</p>}
      {edit && <CommentEditor comment={comment} />}
      {isOwner && (
        <button onClick={toggleEdit} className={styles.editCommentBtn}>
          Edit
        </button>
      )}
    </div>
  );
}

export default Comment;
