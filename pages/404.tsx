import Head from "next/head";
import Link from "next/link";
import styles from "./404.module.scss";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>Página não encontrada | JOTA News</title>
        <meta
          name="description"
          content="A página que você procura não existe"
        />
      </Head>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>
          <h1 className={styles.title}>Página não encontrada</h1>
          <p className={styles.description}>
            Desculpe, a página que você está procurando não existe ou foi
            removida.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.primaryButton}>
              Ir para home
            </Link>
            <Link href="/noticia" className={styles.secondaryButton}>
              Ver todas as notícias
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404;
