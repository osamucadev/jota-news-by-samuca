import Head from "next/head";
import NewsList from "@/components/NewsList";
import { ArrayOfNews } from "@/types/news";
import HorizontalNewsBanner from "@/components/HorizontalNewsBanner";
import LoadMoreButton from "@/components/LoadMoreButton";
import { GetStaticProps } from "next";
import usePagination from "@/hooks/usePagination";
import styles from "./styles.module.scss";

interface HomeProps {
  news: ArrayOfNews;
  error?: boolean;
}

export default function Home({ news, error }: HomeProps) {
  const {
    data: allNews,
    loadingMore,
    hasMore,
    hasError: paginationError,
    loadMore,
  } = usePagination({
    initialData: news,
    apiUrl: `${process.env.NEXT_PUBLIC_API_NEWS_URL}/news`,
    itemsPerPage: 10,
  });

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
            <p>
              Ocorreu um erro ao carregar as notícias. Tente novamente mais
              tarde.
            </p>
          ) : allNews && allNews.length > 0 ? (
            <>
              <HorizontalNewsBanner news={allNews[0]} />
              <NewsList newsList={allNews.slice(1)} />

              {hasMore && (
                <LoadMoreButton
                  onClick={loadMore}
                  loading={loadingMore}
                  hasError={paginationError}
                />
              )}
            </>
          ) : (
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
      `${process.env.NEXT_PUBLIC_API_NEWS_URL}/news?page=1&limit=10`
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
