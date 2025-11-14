"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const Header = () => {
  const { token, favorites, handleLogin, handleLogout } = useAuth();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setHasMounted(true);
    });
  }, []);

  if (!hasMounted) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <h1 className={styles.title}>
              JOTA – Fonte de confiança para você
            </h1>
          </Link>

          <nav className={styles.nav}>
            <Link href="/" className={styles.link}>
              Home
            </Link>
          </nav>
        </div>
      </header>
    );
  }

  const isLoggedIn = !!token;
  const favoritesCount = favorites.length;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/img/jotalogo.svg"
            alt="JOTA News"
            width={140}
            height={32}
            priority
          />
        </Link>

        <nav className={styles.nav}>
          {isLoggedIn && (
            <Link
              href="/admin"
              className={`${styles.link} ${
                router.pathname === "/admin" ? styles.active : ""
              }`}
            >
              Admin {favoritesCount > 0 && `(${favoritesCount})`}
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={`${styles.button} ${styles.btnLogout}`}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className={`${styles.button} ${styles.btnLogin}`}
            >
              Fazer login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
