import Head from "next/head";
import NewsList from "@/components/NewsList";
import { ArrayOfNews } from "@/types/news";
import HorizontalNewsBanner from "@/components/HorizontalNewsBanner";
import { GetStaticProps } from "next";
import styles from "./styles.module.scss";

interface HomeProps {
  news: ArrayOfNews;
  error?: boolean;
}

export default function Home({ news, error }: HomeProps) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContent}>
        <Head>
          <title>JOTA – Fonte de confiança para você</title>
          <meta
            name="description"
            content="Portal de notícias do teste técnico"
          />
        </Head>
        <main>
          <h1>JOTA – Fonte de confiança para você</h1>

          {error ? (
            // TODO: substituir por página de erro
            <p>
              Ocorreu um erro ao carregar as notícias. Tente novamente mais
              tarde.
            </p>
          ) : news && news.length > 0 ? (
            <>
              <HorizontalNewsBanner news={news[0]} />
              <NewsList newsList={news.slice(1)} />
            </>
          ) : (
            // TODO: substituir por componente de falta de notícias
            <p>Nenhuma notícia disponível no momento.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEWS_URL}/news`
    );

    if (!response.ok) {
      throw new Error("Falha ao buscar notícias");
    }

    const news: ArrayOfNews = await response.json();

    return {
      props: {
        news,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return {
      props: {
        news: [],
        error: true,
      },
      revalidate: 10,
    };
  }
};
