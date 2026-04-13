// import { dbConnect } from "@/lib/dbConnect";

// // GET Method
// export async function GET() {
//   try {
//     const careCollection = await dbConnect("babyCare");
//     const usersCollection = await dbConnect("users");

//     const careResult = await careCollection.find().toArray();
//     const usersResult = await usersCollection.find().toArray();

//     return Response.json({
//       careData: careResult,
//       usersData: usersResult,
//     });
//   } catch (error) {
//     console.error("GET Error:", error);
//     return Response.json({ message: "Failed to fetch data" }, { status: 500 });
//   }
// }

// // POST Method
// export async function POST(request) {
//   try {
//     const careCollection = await dbConnect("babyCare");
//     const { message } = await request.json();

//     if (!message || typeof message !== "string") {
//       return Response.json(
//         { message: "Please send a valid message" },
//         { status: 400 },
//       );
//     }

//     const newFeedback = {
//       message,
//       status: "pending",
//       date: new Date().toISOString(),
//     };

//     const result = await careCollection.insertOne(newFeedback);

//     return Response.json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     console.error("POST Error:", error);
//     return Response.json({ message: "Failed to insert data" }, { status: 500 });
//   }
// }
import { dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // path check করবা

// GET Method
export async function GET() {
  try {
    // 🔥 ADD: session check
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;

    const careCollection = await dbConnect("babyCare");
    const allCareCollection = await dbConnect("babyCare");
    const usersCollection = await dbConnect("users");

    // 🔥 CHANGE: filter by email
    const careResult = await careCollection
      .find({ email: userEmail })
      .toArray();

    const allCareResult = await allCareCollection.find().toArray();
    const usersResult = await usersCollection.find().toArray();

    return Response.json({
      careData: careResult,
      allCareData: allCareResult,
      usersData: usersResult,
    });
  } catch (error) {
    console.error("GET Error:", error);
    return Response.json({ message: "Failed to fetch data" }, { status: 500 });
  }
}

// POST Method
export async function POST(request) {
  try {
    const careCollection = await dbConnect("babyCare");

    // 🔥 ADD: session
    const session = await getServerSession(authOptions);

    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return Response.json(
        { message: "Please send a valid message" },
        { status: 400 },
      );
    }

    const newFeedback = {
      message,
      email: session?.user?.email, // 🔥 ADD THIS
      status: "pending",
      date: new Date().toISOString(),
    };

    const result = await careCollection.insertOne(newFeedback);

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("POST Error:", error);
    return Response.json({ message: "Failed to insert data" }, { status: 500 });
  }
}
