import { MovieDetailsPage } from "@/features/MovieDetailsPage/MovieDetailsPage.component";

interface Props {
  params: { id: string };
}

export default function getMovieDetails({ params }: Props) {
  return <MovieDetailsPage params={params} />;
}
