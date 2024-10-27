import connectMongoDB from "@/src/lib/connectMongoDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

function checkPassword(request) {
  const password = request.headers.get("password");
  return password === process.env.ADMIN_PASSWORD;
}

export async function GET(request) {
  try {
    const mongoClient = await connectMongoDB();
    const db = mongoClient.db("filmisbest");
    const collection = db.collection("movierequests");
    const results = await collection.find({}).toArray();

    if (!checkPassword(request))
      return NextResponse.json({ message: "Enter Password" }, { status: 400 });
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { fullName, email, movieName } = await request.json();
    if (!fullName || !email || !movieName) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }
    const mongoClient = await connectMongoDB();
    const db = mongoClient.db("filmisbest");
    const collection = db.collection("movierequests");

    const result = await collection.insertOne({
      fullName,
      email,
      movieName,
      added: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json(
      { message: "MovieRequest Created", result },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    const mongoClient = await connectMongoDB();
    const db = mongoClient.db("filmisbest");
    const collection = db.collection("movierequests");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "MovieRequest not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "MovieRequest deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const { added } = await request.json();

    if (typeof added !== "boolean") {
      return NextResponse.json(
        { message: "Invalid value for 'added'" },
        { status: 400 },
      );
    }

    const mongoClient = await connectMongoDB();
    const db = mongoClient.db("filmisbest");
    const collection = db.collection("movierequests");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { added: added, updatedAt: new Date() } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "MovieRequest not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Request updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
