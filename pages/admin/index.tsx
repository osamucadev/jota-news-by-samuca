import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NewsCard from "@/components/NewsCard";
import Head from "next/head";
import Link from "next/link";
import styles from "./styles.module.scss";
import SkeletonNewsCard from "@/components/SkeletonNewsCard.tsx";

const Admin = () => {
  const { token, favorites } = useAuth();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setHasMounted(true));
  }, []);

  useEffect(() => {
    if (hasMounted && !token) {
      router.push("/");
    }
  }, [hasMounted, token, router]);

  if (!hasMounted) {
    return (
      <main className={styles.pageContainer}>
        <header className={styles.header}>
          <h1>Minhas Notícias Favoritas</h1>
          <p>Aqui você encontra todas as notícias que salvou.</p>
        </header>

        <SkeletonNewsCard />
        <SkeletonNewsCard />
        <SkeletonNewsCard />
      </main>
    );
  }

  if (!token) return null;

  return (
    <>
      <Head>
        <title>Admin - Favoritos | JOTA News</title>
        <meta name="description" content="Suas notícias favoritas" />
      </Head>

      <main className={styles.pageContainer}>
        <header className={styles.header}>
          <h1>Minhas Notícias Favoritas</h1>
          <p>Aqui você encontra todas as notícias que salvou.</p>
        </header>

        {favorites.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>Nenhuma notícia favoritada ainda</h2>
            <p>
              Você ainda não adicionou notícias aos seus favoritos. Explore a
              página inicial e encontre algo que queira guardar!
            </p>
            <p>
              <Link href="/">Ir para a página inicial →</Link>
            </p>
          </div>
        ) : (
          <>
            <div className={styles.infoBox}>
              Você possui <strong>{favorites.length}</strong>{" "}
              {favorites.length === 1
                ? "notícia favorita"
                : "notícias favoritas"}
              .
            </div>

            <div className={styles.newsList}>
              {favorites.map((id) => (
                <NewsCard key={id} id={id} fetchData={true} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Admin;
