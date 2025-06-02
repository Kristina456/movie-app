import { MovieDetails } from "@/components/MovieDetails/MovieDetails.component";
import { MovieCasts } from "@/types/CastsData.dto";
import { MovieItem } from "@/types/MoviesData.dto";
import styles from "./MovieDetailsPage.module.scss";

interface Props {
  movieData: MovieItem;
  movieCasts: MovieCasts;
}

export async function MovieDetailsPage({ movieData, movieCasts }: Props) {
  return (
    <div className={styles["movie-details-page"]}>
      <h1>Movie details</h1>
      <section className={styles["movie-details-page__movie-details"]}>
        <MovieDetails movieData={movieData} movieCasts={movieCasts} />
      </section>
    </div>
  );
}
