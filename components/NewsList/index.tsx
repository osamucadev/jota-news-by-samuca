import { NewsListProps } from "@/types/news";
import NewsCard from "../NewsCard";

const NewsList = ({ newsList }: NewsListProps) => {
  if (Array.isArray(newsList) && newsList.length > 0) {
    return (
      <>
        {newsList.map(({ id, category, photo, title, createdAt }) => (
          <NewsCard
            key={id}
            category={category}
            title={title}
            photo={photo}
            createdAt={createdAt}
            id={id}
          />
        ))}
      </>
    );
  }

  return <p>Nenhuma notícia encontrada.</p>;
};

export default NewsList;
