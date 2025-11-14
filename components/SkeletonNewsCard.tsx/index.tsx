import styles from "./styles.module.scss";

const SkeletonNewsCard = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.thumbnail} />
      <div className={styles.content}>
        <div className={styles.line} />
        <div className={styles.lineSmall} />
      </div>
    </div>
  );
};

export default SkeletonNewsCard;
