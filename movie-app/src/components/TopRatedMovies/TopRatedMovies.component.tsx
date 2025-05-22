import { MoviesData } from "@/types/MoviesData.dto";
import styles from "./TopRatedMovies.module.scss";
import Link from "next/link";
import { FavoriteMovieButton } from "../FavoriteMovieButton/FavoriteMovieButton.component";

interface Props {
  topRatedMovies: MoviesData;
}

export function TopRatedMovies({ topRatedMovies }: Props) {
  return (
    <div className={styles["top-rated-movies"]}>
      <h2>Top rated</h2>
      <div className={styles["top-rated-movies__wrapper"]}>
        {topRatedMovies.results.slice(0, 3).map((movie, index) => (
          <div key={index} className={styles["top-rated-movies__movie"]}>
            <Link
              href={{
                pathname: `/movies/${movie.id}`,
              }}
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
