"use client";

import { useLoginModal } from "@/hooks/useLoginModal";
import { useAuth } from "@/hooks/useAuth";
import styles from "./styles.module.scss";

const LoginModal = () => {
  const { isOpen, closeModal } = useLoginModal();
  const { handleLogin } = useAuth();

  if (!isOpen) return null;

  const onLoginClick = () => {
    handleLogin();
    closeModal();
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // impede fechar clicando dentro
      >
        <h2>Gostou deste conteúdo?</h2>
        <p>Faça login para salvar suas notícias favoritas.</p>

        <button className={styles.loginButton} onClick={onLoginClick}>
          Fazer login
        </button>

        <button className={styles.closeButton} onClick={closeModal}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
