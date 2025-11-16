import Head from "next/head";
import { GetStaticProps } from "next";
import { ArrayOfNews } from "@/types/news";
import NewsList from "@/components/NewsList";
import LoadMoreButton from "@/components/LoadMoreButton";
import usePagination from "@/hooks/usePagination";
import styles from "./styles.module.scss";

interface AllNewsProps {
  news: ArrayOfNews;
  error?: boolean;
}

const AllNews = ({ news, error }: AllNewsProps) => {
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
    <>
      <Head>
        <title>Todas as Notícias | JOTA News</title>
        <meta
          name="description"
          content="Confira todas as notícias do portal JOTA"
        />
      </Head>

      <div className={styles.container}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h1>Todas as Notícias</h1>
            <p>Confira todo o conteúdo do nosso portal</p>
          </header>

          {error ? (
            <p className={styles.error}>
              Ocorreu um erro ao carregar as notícias. Tente novamente mais
              tarde.
            </p>
          ) : allNews && allNews.length > 0 ? (
            <>
              <NewsList newsList={allNews} />

              {hasMore && (
                <LoadMoreButton
                  onClick={loadMore}
                  loading={loadingMore}
                  hasError={paginationError}
                />
              )}
            </>
          ) : (
            <p className={styles.empty}>
              Nenhuma notícia disponível no momento.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<AllNewsProps> = async () => {
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

export default AllNews;
