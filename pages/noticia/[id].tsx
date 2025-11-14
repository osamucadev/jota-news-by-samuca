import { GetServerSideProps } from "next";
import Head from "next/head";
import { News } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import styles from "./styles.module.scss";

interface NewsDetailProps {
  news: News | null;
  error?: string;
}

const NewsDetail = ({ news, error }: NewsDetailProps) => {
  // TODO: substituir por página de erro
  if (error) {
    return (
      <p>Ocorreu um erro ao carregar a notícia. Tente novamente mais tarde.</p>
    );
  }

  if (!news) {
    // TODO: substituir por componente de "notícia não encontrada"
    return <p>Notícia não encontrada.</p>;
  }

  const { title, category, photo, content, createdAt } = news;

  return (
    <>
      <Head>
        <title>{title} | JOTA News</title>
        <meta name="description" content={content.slice(0, 150)} />
      </Head>

      <main className={styles.pageContainer}>
        <nav>
          <Link href="/" className={styles.backLink}>
            ← Voltar
          </Link>
        </nav>

        <article className={styles.article}>
          <p className={styles.category}>{category}</p>
          <h1 className={styles.title}>{title}</h1>
          <small className={styles.timestamp}>{formatTimeAgo(createdAt)}</small>

          <div className={styles.imageWrapper}>
            <Image
              src={photo}
              alt={title}
              fill
              className={styles.coverImage}
              priority
            />
          </div>

          <section className={styles.content}>
            {content.split("\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </section>
        </article>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEWS_URL}/news/${id}`
    );

    if (!response.ok) {
      return {
        props: {
          news: null,
          error: "Notícia não encontrada",
        },
      };
    }

    const news: News = await response.json();

    return {
      props: {
        news,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        news: null,
        error: "Erro ao carregar a notícia",
      },
    };
  }
};

export default NewsDetail;
