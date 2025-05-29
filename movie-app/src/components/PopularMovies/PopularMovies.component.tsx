"use client";
import { MoviesData } from "@/types/MoviesData.dto";
import styles from "./PopularMovies.module.scss";
import { SectionTitle } from "../SectionTitle/SectionTitle.component";
import "swiper/css";
import "swiper/css/pagination";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { MovieCard } from "../MovieCard/MovieCard.component";

interface Props {
  popularMovies: MoviesData;
}

export function PopularMovies({ popularMovies }: Props) {
  return (
    <div className={styles["popular-movies"]}>
      <div className={styles["popular-movies__title"]}>
        <SectionTitle title="Popular movies" />
      </div>
      <div className={styles["popular-movies__slider"]}>
        <div className={styles["popular-movies__slider-buttons"]}>
          <button className={"swiper-button-prev custom-prev"}>
            <Image
              src="/images/slider-arrow.svg"
              alt="slider-arrow"
              width={50}
              height={50}
            />
          </button>
          <button className={"swiper-button-next custom-next"}>
            <Image
              src="/images/slider-arrow.svg"
              alt="slider-arrow"
              width={50}
              height={50}
            />
          </button>
        </div>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode, Navigation]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
        >
          {popularMovies.results.slice(0, 10).map((movie, index) => (
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
  );
}
