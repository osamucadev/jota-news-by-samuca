export type News = {
  createdAt: string;
  title: string;
  photo: string;
  category: string;
  content: string;
  id: string;
};

export type ArrayOfNews = News[];

export type NewsListProps = {
  newsList: ArrayOfNews;
};
