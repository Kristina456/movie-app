import { MovieDetailsPage } from "@/features/MovieDetailsPage/MovieDetailsPage.component";
import { getMovieCasts, getMovieDetails } from "@/lib/apiService";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movieData = await getMovieDetails(id);
  const movieCasts = await getMovieCasts(id);

  if (!movieData || !movieCasts) {
    notFound();
  }

  return <MovieDetailsPage movieData={movieData} movieCasts={movieCasts} />;
}
