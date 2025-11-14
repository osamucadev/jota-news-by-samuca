export const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);

  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) {
    return "agora mesmo";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min atrás`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hora" : "horas"} atrás`;
  } else {
    return `${diffInDays} ${diffInDays === 1 ? "dia" : "dias"} atrás`;
  }
};
