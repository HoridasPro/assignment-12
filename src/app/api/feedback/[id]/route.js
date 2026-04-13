import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const { role, status } = await req.json();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const userCollection = await dbConnect("users");
    const careCollection = await dbConnect("babyCare");

    if (role) {
      const result = await userCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role } },
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        message: `User role updated to ${role}`,
      });
    }

    if (status) {
      const result = await careCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } },
      );

      if (result.matchedCount === 0) {
        return NextResponse.json(
          { error: "Booking not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({
        message: "Booking status updated",
      });
    }

    return NextResponse.json(
      { error: "No data provided to update" },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const userCollection = await dbConnect("users");
    const careCollection = await dbConnect("babyCare");

    const res1 = await userCollection.deleteOne({
      _id: new ObjectId(id),
    });

    const res2 = await careCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (res1.deletedCount === 0 && res2.deletedCount === 0) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
