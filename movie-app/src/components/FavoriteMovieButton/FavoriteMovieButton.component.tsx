"use client";

import { useEffect, useState } from "react";

interface Props {
  movieId: number;
  movieName: string;
}

interface FavoriteMovieItem {
  id: number;
  name: string;
}

export function FavoriteMovieButton({ movieId, movieName }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  const checkIfFavorite = () => {
    const stored = localStorage.getItem("favorites");
    const favorites: FavoriteMovieItem[] = stored ? JSON.parse(stored) : [];
    return favorites.some((movie) => movie.id === movieId);
  };

  useEffect(() => {
    setIsFavorite(checkIfFavorite());

    const handleStorageChange = () => {
      setIsFavorite(checkIfFavorite());
    };

    const handleCustomFavoriteChange = () => {
      setIsFavorite(checkIfFavorite());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("favorite-updated", handleCustomFavoriteChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "favorite-updated",
        handleCustomFavoriteChange
      );
    };
  }, [movieId]);

  const handleButtonClick = () => {
    const stored = localStorage.getItem("favorites");
    let favorites: FavoriteMovieItem[] = stored ? JSON.parse(stored) : [];

    const alreadyFavorite = favorites.some((movie) => movie.id === movieId);

    if (alreadyFavorite) {
      favorites = favorites.filter((movie) => movie.id !== movieId);
      setIsFavorite(false);
    } else {
      favorites.push({ id: movieId, name: movieName });
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    window.dispatchEvent(new Event("favorite-updated"));
  };

  return (
    <div>
      <button onClick={handleButtonClick}>{isFavorite ? "★" : "☆"}</button>
    </div>
  );
}
