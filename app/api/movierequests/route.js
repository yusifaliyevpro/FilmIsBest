import connectMongoDB from "@/lib/database";
import MovieRequestModel from "@/models/MovieRequestModel";
import { NextResponse } from "next/server";

function checkPassword(request) {
  const password = request.headers.get("password");
  return password === process.env.ADMIN_PASSWORD;
}

export async function GET(request) {
  if (!checkPassword(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  await connectMongoDB();
  const movieRequests = await MovieRequestModel.find();
  return NextResponse.json({ movieRequests });
}

export async function POST(request) {
  const { fullName, email, movieName } = await request.json();
  await connectMongoDB();
  await MovieRequestModel.create({
    fullName,
    email,
    movieName,
  });
  return NextResponse.json(
    { message: "MovieRequest Created" },
    { status: 201 },
  );
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await MovieRequestModel.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "MovieRequest deleted" },
    { status: 200 },
  );
}
