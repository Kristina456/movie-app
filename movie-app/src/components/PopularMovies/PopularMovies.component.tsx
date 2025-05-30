"use client";
import { MovieItem } from "@/types/MoviesData.dto";
import styles from "./PopularMovies.module.scss";
import { SectionTitle } from "../SectionTitle/SectionTitle.component";
import "swiper/css";
import "swiper/css/pagination";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { MovieCard } from "../MovieCard/MovieCard.component";
import { useEffect, useState } from "react";
import { Genre, MoviesGenres } from "@/types/MoviesGenres.dto";

type MoviesGenresWithData = {
  genre: Genre;
  moviesData: MoviesData;
}[];

type MoviesData = {
  page: number;
  results: MovieItem[];
};

export function PopularMovies() {
  const [movies, setMovies] = useState<MoviesGenresWithData>([]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(`/api/genre`);
      const genres: MoviesGenres = await response.json();
      const first10Genres = genres.genres.slice(0, 10);

      const moviesGenresWithData = await Promise.all(
        first10Genres.map(async (genre) => {
          const MovieData = await fetch(
            `/api/most-watched?with_genres=${genre.id}`
          );
          const moviesData: MoviesData = await MovieData.json();
          return {
            genre,
            moviesData,
          };
        })
      );
      setMovies(moviesGenresWithData);
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div className={styles["popular-movies"]}>
      <div className={styles["popular-movies__title"]}>
        <SectionTitle title="Popular movies" />
      </div>
      {movies.map((item, index) => (
        <div key={index} className={styles["popular-movies__genre-wrapper"]}>
          <div className={styles["popular-movies__genre-title"]}>
            {item.genre.name}
          </div>
          <div className={styles["popular-movies__button-preview"]}>
            <button className={`swiper-button-prev custom-prev-${index} `}>
              <Image
                src="/images/slider-arrow.svg"
                alt="slider-prev"
                width={50}
                height={50}
              />
            </button>
          </div>
          <div className={styles["popular-movies__button-next"]}>
            <button className={`swiper-button-next custom-next-${index}`}>
              <Image
                src="/images/slider-arrow.svg"
                alt="slider-next"
                width={50}
                height={50}
              />
            </button>
          </div>
          <div className={styles["popular-movies__slider"]}>
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
              freeMode={true}
              modules={[FreeMode, Navigation]}
              navigation={{
                prevEl: `.custom-prev-${index}`,
                nextEl: `.custom-next-${index}`,
              }}
            >
              {item.moviesData.results.map((movie, idx) => (
                <SwiperSlide
                  key={idx}
                  className={styles["popular-movies__wrapper"]}
                >
                  <MovieCard movie={movie} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ))}
    </div>
  );
}
