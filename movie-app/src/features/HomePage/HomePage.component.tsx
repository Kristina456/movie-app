import { PopularMovies } from "@/components/PopularMovies/PopularMovies.component";
import { MoviesData } from "../../dtos/MoviesData.dto";
import styles from "./HomePage.module.scss";
import { TopRatedMovies } from "@/components/TopRatedMovies/TopRatedMovies.component";
import { NewestMovies } from "@/components/NewestMovies/NewestMovies.component";

interface Props {
  newestMovies: MoviesData;
  topRatedMovies: MoviesData;
  popularMovies: MoviesData;
}

export function HomePage({
  newestMovies,
  topRatedMovies,
  popularMovies,
}: Props) {
  console.log(popularMovies, "newest movies");
  return (
    <div className={styles["home-page"]}>
      <section className={styles["home-page__top-rated"]}>
        <TopRatedMovies topRatedMovies={topRatedMovies} />
      </section>
      <section className={styles["home-page__popular"]}>
        <PopularMovies popularMovies={popularMovies} />
      </section>
      <section className={styles["home-page__newest-movies"]}>
        <NewestMovies newestMovies={newestMovies} />
      </section>
    </div>
  );
}
