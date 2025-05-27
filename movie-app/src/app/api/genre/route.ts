import { getMoviesGenre } from "@/lib/apiService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const movies = await getMoviesGenre();
    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching genres:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
