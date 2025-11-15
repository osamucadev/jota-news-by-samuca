import { ArrayOfNews } from "@/types/news";
import NewsCard from "../NewsCard";
import styles from "./styles.module.scss";

interface RelatedNewsProps {
  newsList: ArrayOfNews;
}

const RelatedNews = ({ newsList }: RelatedNewsProps) => {
  if (!newsList || newsList.length === 0) {
    return null;
  }

  return (
    <section className={styles.relatedNews}>
      <h2 className={styles.title}>Você pode se interessar também</h2>

      <div className={styles.grid}>
        {newsList.map((news) => (
          <NewsCard
            key={news.id}
            id={news.id}
            category={news.category}
            title={news.title}
            photo={news.photo}
            createdAt={news.createdAt}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedNews;
