import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// ✅ PATCH (Update Role or Booking Status)
export async function PATCH(req, { params }) {
  try {
    const { id } = await params; // ✅ FIXED (no await)
    const { role, status } = await req.json(); // ✅ both নেওয়া হলো

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const userCollection = await dbConnect("users");
    const careCollection = await dbConnect("babyCare");

    // ✅ 1. Update User Role
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

    // ✅ 2. Update Booking Status
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

// ✅ DELETE (User or Booking delete)
export async function DELETE(req, { params }) {
  try {
    const { id } = await params; // ✅ FIXED

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const userCollection = await dbConnect("users");
    const careCollection = await dbConnect("babyCare");

    // ✅ Try deleting from both collections
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
 