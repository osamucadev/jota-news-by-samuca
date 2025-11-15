import styles from "./styles.module.scss";

interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
  hasError?: boolean;
}

const LoadMoreButton = ({
  onClick,
  loading,
  hasError,
}: LoadMoreButtonProps) => {
  return (
    <div className={styles.container}>
      {hasError && (
        <p className={styles.errorMessage}>
          Erro ao carregar mais notícias. Tente novamente.
        </p>
      )}

      <button
        onClick={onClick}
        disabled={loading}
        className={`${styles.button} ${loading ? styles.loading : ""}`}
      >
        {loading ? "Carregando..." : "Ver mais notícias"}
      </button>
    </div>
  );
};

export default LoadMoreButton;
