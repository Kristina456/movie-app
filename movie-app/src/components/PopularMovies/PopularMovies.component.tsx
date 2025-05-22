import { MoviesData } from "@/types/MoviesData.dto";
import styles from "./PopularMovies.module.scss";
import Link from "next/link";
import { FavoriteMovieButton } from "../FavoriteMovieButton/FavoriteMovieButton.component";

interface Props {
  popularMovies: MoviesData;
}

export function PopularMovies({ popularMovies }: Props) {
  return (
    <div className={styles["popular-movies"]}>
      <h2>Popular</h2>
      <div>
        {popularMovies.results.slice(0, 10).map((movie, index) => (
          <div key={index} className={styles["popular-movies__wrapper"]}>
            <Link
              href={{
                pathname: `/movies/${movie.id}`,
              }}
              className={styles["popular-movies__movie"]}
            >
              <div>{movie.title}</div>
              {movie.overview.slice(0, 100) || "There is no overview for now."}
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
