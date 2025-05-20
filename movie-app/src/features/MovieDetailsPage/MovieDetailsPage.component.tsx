import { notFound } from "next/navigation";
import Image from "next/image";
import { getMovieDetails } from "@/lib/apiService";

interface Props {
  params: { id: string };
}

export async function MovieDetailsPage({ params }: Props) {
  const movieData = await getMovieDetails(params.id);

  if (!movieData) {
    notFound();
  }

  return (
    <div>
      <div>
        <Image
          src={`${process.env.IMAGE_URL}${movieData.poster_path}`}
          alt={`${movieData.title} poster`}
          width={100}
          height={100}
        />
      </div>
      <div>
        <Image
          src={`${process.env.IMAGE_URL}${movieData.backdrop_path}`}
          alt={`${movieData.title} poster`}
          width={100}
          height={100}
        />
      </div>
      <div>{movieData.title}</div>
      <div>{movieData.overview}</div>
      <div>{movieData.vote_count}</div>
      <div>{movieData.genre_ids}</div>
      <div>Duration</div>
      <div>Country</div>
      <div>Casts</div>
    </div>
  );
}
