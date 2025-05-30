"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./MovieDetails.module.scss";
import { MovieItem } from "@/types/MoviesData.dto";
import { FavoriteMovieButton } from "../FavoriteMovieButton/FavoriteMovieButton.component";
import { MovieCasts } from "@/types/CastsData.dto";
import { formatRuntime } from "@/lib/formatRuntime";

interface Props {
  movieData: MovieItem;
  movieCasts: MovieCasts;
}

export function MovieDetails({ movieData, movieCasts }: Props) {
  const router = useRouter();

  return (
    <div className={styles["movie-details"]}>
      <div className={styles["movie-details__backdrop"]}>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movieData.backdrop_path}`}
          alt={`${movieData.title} backdrop`}
          fill
          style={{ objectFit: "cover" }}
        />
        <div className={styles["movie-details__backdrop-overlay"]}></div>
      </div>
      <div className={styles["movie-details__close-button"]}>
        <button onClick={() => router.back()}>X</button>
      </div>
      <div className={styles["movie-details__content"]}>
        <div className={styles["movie-details__poster"]}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movieData.poster_path}`}
            alt={`${movieData.title} poster`}
            width={200}
            height={300}
          />
          <div className={styles["movie-details__vote-average"]}>
            ⭐ {movieData.vote_average.toFixed(1)} / 10
          </div>
          <div className={styles["movie-details__runtime"]}>
            ⏰ {formatRuntime(movieData.runtime)}
          </div>
          <div className={styles["movie-details__original-country"]}>
            {movieData.origin_country.map((country, index) => (
              <div key={index}> 🌍 {country}</div>
            ))}
          </div>
        </div>
        <div className={styles["movie-details__info"]}>
          <div className={styles["movie-details__title-wrapper"]}>
            <div className={styles["movie-details__title"]}>
              {movieData.title}
            </div>
            <div className={styles["movie-details__favorite-movie"]}>
              <FavoriteMovieButton
                movieId={movieData.id}
                movieName={movieData.original_title}
              />
            </div>
          </div>
          <div className={styles["movie-details__genres"]}>
            {movieData.genres.map((genre, index) => (
              <div key={index}>{genre.name}</div>
            ))}
          </div>
          <div className={styles["movie-details__overview"]}>
            {movieData.overview}
          </div>

          <div className={styles["movie-details__casts"]}>
            <div>Casts: </div>
            {movieCasts.cast.slice(0, 6).map((character, index) => (
              <div key={index} className="cast-member">
                {character.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
