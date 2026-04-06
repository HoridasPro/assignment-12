import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
// For thea patch
export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    const collection = await dbConnect("babyCare");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } },
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Update failed" }, { status: 400 });
    }

    return NextResponse.json({
      message: "Status updated successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// For the delete
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const collection = await dbConnect("babyCare");

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "No data found with this ID" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
