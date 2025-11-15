import { GetServerSideProps } from "next";
import Head from "next/head";
import { News, ArrayOfNews } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import RelatedNews from "@/components/RelatedNews";
import styles from "./styles.module.scss";

interface NewsDetailProps {
  news: News | null;
  relatedNews: ArrayOfNews;
  error?: string;
}

const NewsDetail = ({ news, relatedNews, error }: NewsDetailProps) => {
  if (error) {
    return (
      <p>Ocorreu um erro ao carregar a notícia. Tente novamente mais tarde.</p>
    );
  }

  if (!news) {
    return <p>Notícia não encontrada.</p>;
  }

  const { title, category, photo, content, createdAt } = news;

  return (
    <>
      <Head>
        <title>{title} | JOTA News</title>
        <meta name="description" content={content.slice(0, 150)} />
      </Head>

      <div className={styles.pageContainer}>
        <Link href="/" className={styles.backLink}>
          ← Voltar
        </Link>

        <article className={styles.article}>
          <span className={styles.category}>{category}</span>
          <h1 className={styles.title}>{title}</h1>
          <time className={styles.timestamp}>{formatTimeAgo(createdAt)}</time>

          <div className={styles.imageWrapper}>
            <Image src={photo} alt={title} fill className={styles.coverImage} />
          </div>

          <div className={styles.content}>
            {content.split("\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </article>
        <RelatedNews newsList={relatedNews} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<NewsDetailProps> = async (
  context
) => {
  const { id } = context.params as { id: string };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEWS_URL}/news/${id}`
    );

    if (!response.ok) {
      return {
        props: {
          news: null,
          relatedNews: [],
          error: "Notícia não encontrada",
        },
      };
    }

    const news: News = await response.json();

    const relatedResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEWS_URL}/news?limit=5`
    );

    let relatedNews: ArrayOfNews = [];

    if (relatedResponse.ok) {
      const allRelated: ArrayOfNews = await relatedResponse.json();
      const filtered = allRelated.filter((item) => item.id !== id);
      relatedNews = filtered.slice(0, 4);
    }

    return {
      props: {
        news,
        relatedNews,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar notícia:", error);
    return {
      props: {
        news: null,
        relatedNews: [],
        error: "Erro ao carregar a notícia",
      },
    };
  }
};

export default NewsDetail;
