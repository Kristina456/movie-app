import Link from "next/link";
import styles from "./TopRatedMovie.module.scss";
import { MovieItem } from "@/types/MoviesData.dto";
import Image from "next/image";
import { FavoriteMovieButton } from "../FavoriteMovieButton/FavoriteMovieButton.component";

interface Props {
  movie: MovieItem;
}

export function TopRatedMovie({ movie }: Props) {
  return (
    <div className={styles["top-rated-movie"]}>
      <div className={styles["top-rated-movie__favorite-movie"]}>
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
        <div className={styles["top-rated-movie__backdrop"]}>
          {movie.backdrop_path && (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.backdrop_path}`}
              alt={`${movie.title} poster`}
              width={250}
              height={100}
            />
          )}
        </div>
        <div className={styles["top-rated-movie__wrapper"]}>
          <h3 className={styles["top-rated-movie__title"]}>{movie.title}</h3>
          <p className={styles["top-rated-movie__overview"]}>
            {movie.overview.slice(0, 100) || "There is no overview for now"}...
          </p>
        </div>
      </Link>
    </div>
  );
}
