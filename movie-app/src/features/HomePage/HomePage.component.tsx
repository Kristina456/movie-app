import { PopularMovies } from "@/components/PopularMovies/PopularMovies.component";
import { MoviesData } from "../../types/MoviesData.dto";
import styles from "./HomePage.module.scss";
import { TopRatedMovies } from "@/components/TopRatedMovies/TopRatedMovies.component";
import { NewestMovies } from "@/components/NewestMovies/NewestMovies.component";

interface Props {
  newestMovies: MoviesData;
  topRatedMovies: MoviesData;
}

export function HomePage({ newestMovies, topRatedMovies }: Props) {
  return (
    <div className={styles["home-page"]}>
      <section className={styles["home-page__top-rated"]}>
        <TopRatedMovies topRatedMovies={topRatedMovies} />
      </section>
      <section className={styles["home-page__popular"]}>
        <PopularMovies />
      </section>
      <section className={styles["home-page__newest-movies"]}>
        <NewestMovies newestMovies={newestMovies} />
      </section>
    </div>
  );
}
