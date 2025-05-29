import { MoviesData } from "@/types/MoviesData.dto";
import styles from "./NewestMovies.module.scss";
import { SectionTitle } from "../SectionTitle/SectionTitle.component";
import { MovieCard } from "../MovieCard/MovieCard.component";

interface Props {
  newestMovies: MoviesData;
}

export function NewestMovies({ newestMovies }: Props) {
  return (
    <div className={styles["newest-movies"]}>
      <div className={styles["newest-movies__title"]}>
        <SectionTitle title="Newest movies" />
      </div>
      <div className={styles["newest-movies__wrapper"]}>
        {newestMovies.results.map((movie, index) => (
          <div className={styles["newest-movies__movie"]} key={index}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
