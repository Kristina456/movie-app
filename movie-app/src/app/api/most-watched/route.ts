import { getPopularMoviesWithPage } from "@/lib/apiService";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const genre = searchParams.get("with_genres") || "";
  const releaseYear = searchParams.get("primary_release_year") || "";
  const voteAverage = searchParams.get("vote_average.gte") || "";

  try {
    const movies = await getPopularMoviesWithPage(
      page,
      genre,
      releaseYear,
      voteAverage
    );

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
