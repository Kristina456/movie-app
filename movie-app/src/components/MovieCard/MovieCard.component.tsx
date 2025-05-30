import Link from "next/link";
import styles from "./MovieCard.module.scss";
import { MovieItem } from "@/types/MoviesData.dto";
import Image from "next/image";
import { FavoriteMovieButton } from "../FavoriteMovieButton/FavoriteMovieButton.component";

interface Props {
  movie: MovieItem;
}

export function MovieCard({ movie }: Props) {
  return (
    <div className={styles["movie-card"]}>
      <div className={styles["movie-card__favorite-movie"]}>
        <FavoriteMovieButton
          movieId={movie.id}
          movieName={movie.original_title}
        />
      </div>
      <Link
        href={{
          pathname: `/movies/${movie.id}`,
        }}
        className={styles["movie-card__link"]}
      >
        <div>
          {movie.poster_path && (
            <div className={styles["movie-card__image"]}>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
                alt={`${movie.title} poster`}
                width={100}
                height={150}
              />
            </div>
          )}
        </div>
        <div className={styles["movie-card__title"]}>{movie.title}</div>
      </Link>
    </div>
  );
}
