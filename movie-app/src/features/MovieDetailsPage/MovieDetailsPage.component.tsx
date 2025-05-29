import { notFound } from "next/navigation";
import { getMovieCasts, getMovieDetails } from "@/lib/apiService";
import { MovieDetails } from "@/components/MovieDetails/MovieDetails.component";
import styles from "./MovieDetailsPage.module.scss";

interface Props {
  params: { id: string };
}

export async function MovieDetailsPage({ params }: Props) {
  const movieData = await getMovieDetails(params.id);
  const movieCasts = await getMovieCasts(params.id);

  if (!movieData || !movieCasts) {
    notFound();
  }

  return (
    <div className={styles["movie-details-page"]}>
      <div className={styles["movie-details-page__movie-details"]}>
        <MovieDetails movieData={movieData} movieCasts={movieCasts} />
      </div>
    </div>
  );
}
