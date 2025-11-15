import { formatTimeAgo } from "@/utils/formatTimeAgo";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { News } from "@/types/news";
import styles from "./styles.module.scss";
import { useLoginModal } from "@/hooks/useLoginModal";

type NewsCardFullProps = {
  id: string;
  category: string;
  title: string;
  photo: string;
  createdAt: string;
  fetchData?: never;
};

type NewsCardFetchProps = {
  id: string;
  fetchData: true;
  category?: never;
  title?: never;
  photo?: never;
  createdAt?: never;
};

type NewsCardComponentProps = NewsCardFullProps | NewsCardFetchProps;

const NewsCard = (props: NewsCardComponentProps) => {
  const { token, favorites, toggleFavorite } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);

  const { openModal } = useLoginModal();

  useEffect(() => {
    requestAnimationFrame(() => {
      setHasMounted(true);
    });
  }, []);

  const shouldFetch = props.fetchData === true;

  const {
    data: fetchedNews,
    loading,
    hasError,
  } = useFetchData<News>(
    shouldFetch
      ? `${process.env.NEXT_PUBLIC_API_NEWS_URL}/news/${props.id}`
      : null
  );

  const isLoggedIn = !!token;
  const isFavorited = favorites.includes(props.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      openModal();
      return;
    }

    toggleFavorite(props.id);
  };

  if (shouldFetch && loading) {
    return <div>Carregando notícia...</div>;
  }

  if (shouldFetch && (hasError || !fetchedNews)) {
    return null;
  }

  const newsData = shouldFetch
    ? fetchedNews!
    : {
        category: props.category,
        title: props.title,
        photo: props.photo,
        createdAt: props.createdAt,
      };

  return (
    <div className={styles.newsCard}>
      <Link href={`/noticia/${props.id}`}>
        <div className={styles.mainContainer}>
          <div className={styles.imageContainer}>
            <Image
              src={newsData.photo}
              alt={newsData.title}
              fill
              sizes="100px"
            />
          </div>

          <div className={styles.content}>
            <span className={styles.category}>{newsData.category}</span>
            <h2 className={styles.title}>{newsData.title}</h2>
            {newsData.createdAt && (
              <small className={styles.timestamp}>
                {formatTimeAgo(newsData.createdAt)}
              </small>
            )}

            {hasMounted && (
              <button
                onClick={handleFavoriteClick}
                className={`${styles.favoriteButton} ${
                  isLoggedIn && isFavorited ? styles.favorited : ""
                }`}
              >
                <span>{isLoggedIn && isFavorited ? "❤️" : "🤍"}</span>
                <span>
                  {isLoggedIn && isFavorited ? "Favoritado" : "Favoritar"}
                </span>
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
