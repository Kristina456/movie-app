import { MovieItem } from "@/types/MoviesData.dto";
import styles from "./MostWatchedList.module.scss";
import { MovieCard } from "../MovieCard/MovieCard.component";

interface Props {
  movies: MovieItem[];
}

export function MostWatchedList({ movies }: Props) {
  return (
    <div className={styles["most-watched-list"]}>
      {movies.map((movie, index) => (
        <div key={index} className={styles["most-watched-list__movie-card"]}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
