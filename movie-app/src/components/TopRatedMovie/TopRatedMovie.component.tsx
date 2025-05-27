import Link from "next/link";
import styles from "./TopRatedMovie.module.scss";
import { MovieItem } from "@/types/MoviesData.dto";
import { FavoriteMovieButton } from "@/components/FavoriteMovieButton/FavoriteMovieButton.component";
import Image from "next/image";

interface Props {
  movie: MovieItem;
}

export function TopRatedMovie({ movie }: Props) {
  return (
    <div className={styles["top-rated-movie"]}>
      <div className={styles["top-rated-movie__favorite-button"]}>
        <FavoriteMovieButton
          movieId={movie.id}
          movieName={movie.original_title}
        />
      </div>
      <Link
        href={{
          pathname: `/movies/${movie.id}`,
        }}
        className={styles["top-rated-movie__link"]}
      >
        <div>
          <Image
            src={`${process.env.IMAGE_URL}${movie.poster_path}`}
            alt={`${movie.title} poster`}
            width={100}
            height={150}
          />
          <div className={styles["top-rated-movie__release-date"]}>
            {movie.release_date}
          </div>
        </div>
        <div className={styles["top-rated-movie__wrapper"]}>
          <div className={styles["top-rated-movie__title"]}>{movie.title}</div>
          <div className={styles["top-rated-movie__overview"]}>
            {movie.overview.slice(0, 200) || "There is no overview for now"}...
          </div>
          <div className={styles["top-rated-movie__vote-average"]}>
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </Link>
    </div>
  );
}
