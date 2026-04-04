import { NextResponse } from "next/server";

import { ObjectId } from "mongodb";
import { dbConnect } from "@/lib/dbConnect";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { status } = await request.json();

    // ডাটাবেস কানেকশন (আপনার dbConnect যেভাবে কাজ করে সেভাবে লিখুন)

    const collection = dbConnect("babyCare"); // আপনার MongoDB কালেকশন নাম দিন

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Status updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Database Update Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
