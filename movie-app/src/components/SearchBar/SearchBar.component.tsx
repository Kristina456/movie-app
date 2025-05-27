"use client";
import { ChangeEvent, useState } from "react";
import { MoviesData } from "@/types/MoviesData.dto";
import styles from "./SearchBar.module.scss";
import Image from "next/image";
import Link from "next/link";

export function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<MoviesData | null>(null);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 0) {
      try {
        const res = await fetch(`/api/search?query=${value}`);
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Client-side error fetching search:", error);
      }
    } else {
      setResults(null);
    }
  };

  return (
    <div className={styles["search-bar"]}>
      <label htmlFor="inputId" className={styles["search-bar__label"]}>
        Search
      </label>
      <input
        type="text"
        id="inputId"
        value={inputValue}
        onChange={handleChange}
        className={styles["search-bar__input"]}
      />
      <div className={styles["search-bar__results"]}>
        {results?.results.map((movie) => (
          <div key={movie.id} className={styles["search-bar__result-wrapper"]}>
            <Link
              href={{
                pathname: `/movies/${movie.id}`,
              }}
              className={styles["search-bar__result"]}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={`${movie.title} poster`}
                width={60}
                height={100}
                className={styles["search-bar__image"]}
              />
              <div className={styles["search-bar__title"]}>{movie.title}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
