import { MoviesData } from "@/types/MoviesData.dto";
import styles from "./TopRatedMovies.module.scss";
import { TopRatedMovie } from "../TopRatedMovie/TopRatedMovie.component";
import { SectionTitle } from "../SectionTitle/SectionTitle.component";

interface Props {
  topRatedMovies: MoviesData;
}

export function TopRatedMovies({ topRatedMovies }: Props) {
  return (
    <div className={styles["top-rated-movies"]}>
      <div className={styles["top-rated-movies__title"]}>
        <SectionTitle title="Top rated movies" />
      </div>
      <div className={styles["top-rated-movies__wrapper"]}>
        {topRatedMovies.results.slice(0, 3).map((movie, index) => (
          <div key={index} className={styles["top-rated-movies__movie"]}>
            <TopRatedMovie movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
