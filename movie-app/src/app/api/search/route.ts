import { getSearchedMovies } from "@/lib/apiService";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query || query.length < 1) {
    return NextResponse.json({ results: [] });
  }

  try {
    const movies = await getSearchedMovies(query);
    return NextResponse.json(movies);
  } catch (error) {
    console.error("API /search error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
