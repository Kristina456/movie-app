import { MoviesData } from "@/dtos/MoviesData.dto";
import styles from "./NewestMovies.module.scss";
import Link from "next/link";
import { FavoriteMovieButton } from "../FavoriteMovieButton/FavoriteMovieButton.component";

interface Props {
  newestMovies: MoviesData;
}

export function NewestMovies({ newestMovies }: Props) {
  return (
    <div className={styles["newest-movies"]}>
      <h2>Newest</h2>
      <div>
        {newestMovies.results.map((movie, index) => (
          <div className={styles["newest-movies__wrapper"]} key={index}>
            <Link
              href={{
                pathname: `/movies/${movie.id}`,
              }}
              className={styles["newest-movies__movie"]}
            >
              <div>{movie.title}</div>
              <div>{movie.overview || "There is no overview for now."}</div>
            </Link>
            <FavoriteMovieButton
              movieId={movie.id}
              movieName={movie.original_title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
