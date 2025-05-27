import { MoviesData } from "@/types/MoviesData.dto";
import styles from "./PopularMovies.module.scss";
import { TopRatedMovie } from "../TopRatedMovie/TopRatedMovie.component";
import { SectionTitle } from "../SectionTitle/SectionTitle.component";

interface Props {
  popularMovies: MoviesData;
}

export function PopularMovies({ popularMovies }: Props) {
  return (
    <div className={styles["popular-movies"]}>
      <div className={styles["popular-movies__title"]}>
        <SectionTitle title="Popular movies" />
      </div>
      <div>
        {popularMovies.results.slice(0, 10).map((movie, index) => (
          <div key={index} className={styles["popular-movies__wrapper"]}>
            <TopRatedMovie movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
