import styles from "./Error.module.css";

function Error({ msg }) {
  return (
    <div className={styles.errorBlock}>
      <div>!</div>
      <p>{msg}</p>
    </div>
  );
}

export default Error;
