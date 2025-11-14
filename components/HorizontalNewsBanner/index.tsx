import { News } from "@/types/news";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useLoginModal } from "@/hooks/useLoginModal";

type HorizontalNewsBannerProps = {
  news: News;
};

const HorizontalNewsBanner = ({ news }: HorizontalNewsBannerProps) => {
  const { id, title, category, photo, createdAt } = news;
  const { token, favorites, toggleFavorite } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);
  const { openModal } = useLoginModal();

  useEffect(() => {
    requestAnimationFrame(() => {
      setHasMounted(true);
    });
  }, []);

  const isLoggedIn = !!token;
  const isFavorited = favorites.includes(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      openModal();
      return;
    }

    toggleFavorite(id);
  };

  return (
    <section className={styles.hero}>
      <Link href={`/noticia/${id}`}>
        <div className={styles.heroContainer}>
          <div className={styles.imageWrapper}>
            <span className={styles.badge}>Em destaque</span>
            <Image
              src={photo}
              alt={title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          <div className={styles.content}>
            <span className={styles.category}>{category}</span>
            <h1 className={styles.title}>{title}</h1>
            <time className={styles.timestamp}>{formatTimeAgo(createdAt)}</time>

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
    </section>
  );
};

export default HorizontalNewsBanner;
