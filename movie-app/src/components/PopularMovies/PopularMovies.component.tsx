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
import { Genre } from "@/types/MoviesGenres.dto";
import { useEffect, useState } from "react";
import { Loading } from "../Loading/Loading.component";

type MoviesList = { genre: Genre; movies: MovieItem[] }[];

export function PopularMovies() {
  const [isLoading, setIsLoading] = useState(false);
  const [moviesData, setMoviesData] = useState<MoviesList>([]);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/popular`);
      const data = await response.json();
      setMoviesData(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles["popular-movies"]}>
      <div className={styles["popular-movies__title"]}>
        <SectionTitle title="Popular movies" />
      </div>
      {moviesData.map((item, index) => (
        <div key={index} className={styles["popular-movies__genre-wrapper"]}>
          <div className={styles["popular-movies__buttons-wrapper"]}>
            <h3 className={styles["popular-movies__genre-title"]}>
              {item.genre.name}
            </h3>
            <div className={styles["popular-movies__buttons"]}>
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
            </div>
          </div>
          <div className={styles["popular-movies__slider"]}>
            <Swiper
              spaceBetween={10}
              freeMode={true}
              modules={[FreeMode, Navigation]}
              navigation={{
                prevEl: `.custom-prev-${index}`,
                nextEl: `.custom-next-${index}`,
              }}
              breakpoints={{
                0: { slidesPerView: 2 },
                650: { slidesPerView: 3 },
                850: { slidesPerView: 4 },
                1000: { slidesPerView: 5 },
              }}
            >
              {item.movies.map((movie, index) => (
                <SwiperSlide
                  key={index}
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
