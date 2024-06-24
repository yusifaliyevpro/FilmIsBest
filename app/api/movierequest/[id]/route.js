import connectMongoDB from "@/lib/database";
import MovieRequestModel from "@/models/MovieRequestModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { added } = await request.json();
  await connectMongoDB();
  await MovieRequestModel.findByIdAndUpdate(id, { added: added });
  return NextResponse.json({ message: "Request updated" }, { status: 200 });
}
