import { MovieItem } from "@/types/MoviesData.dto";
import Link from "next/link";
import { FavoriteMovieButton } from "../FavoriteMovieButton/FavoriteMovieButton.component";
import styles from "./MostWatchedList.module.scss";

interface Props {
  movies: MovieItem[];
}

export function MostWatchedList({ movies }: Props) {
  return (
    <div className={styles["most-watched-list"]}>
      {movies.map((movie, index) => (
        <div key={index} className={styles["most-watched-list__movie-card"]}>
          <Link href={`/movies/${movie.id}`}>
            <div>{movie.title}</div>
            <div>{movie.overview}</div>
            <div>{movie.release_date}</div>
            <div>Rating: {movie.vote_average}</div>
          </Link>
          <FavoriteMovieButton
            movieId={movie.id}
            movieName={movie.original_title}
          />
        </div>
      ))}
    </div>
  );
}
