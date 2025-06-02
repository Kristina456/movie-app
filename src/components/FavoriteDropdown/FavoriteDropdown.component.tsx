"use client";
import { useEffect, useState } from "react";
import styles from "./FavoriteDropdown.module.scss";
import Link from "next/link";
import Image from "next/image";

interface FavoriteMovieItem {
  id: number;
  name: string;
}

export function FavoriteDropdown() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteMovieItem[]>([]);

  const loadFavorites = () => {
    const storedData = localStorage.getItem("favorites");
    const parsedData = storedData ? JSON.parse(storedData) : [];
    setFavorites(parsedData);
  };

  useEffect(() => {
    loadFavorites();

    const handleStorageChange = () => {
      loadFavorites();
    };

    const handleFavoriteUpdate = () => {
      loadFavorites();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("favorite-updated", handleFavoriteUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favorite-updated", handleFavoriteUpdate);
    };
  }, []);

  return (
    <div
      className={styles["favorite-dropdown"]}
      onMouseEnter={() => setShowFavorites(true)}
      onMouseLeave={() => setShowFavorites(false)}
      onClick={() => setShowFavorites(!showFavorites)}
    >
      <button className={styles["favorite-dropdown__button"]}>
        <Image src="/images/star.svg" alt="star image" width={20} height={20} />
      </button>
      {showFavorites && (
        <div className={styles["favorite-dropdown__content"]}>
          <ul>
            {favorites.length > 0 ? (
              favorites.map((movie) => (
                <li
                  key={movie.id}
                  className={styles["favorite-dropdown__movie"]}
                >
                  <Link href={`/movies/${movie.id}`}>{movie.name}</Link>
                </li>
              ))
            ) : (
              <li>No favorites yet...</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
