import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} JOTA – Fonte de confiança para você
        </p>
        <p className={styles.credits}>
          Desenvolvido por{" "}
          <a
            href="https://samuel-caetite-portfolio.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Samuel Caetité
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
