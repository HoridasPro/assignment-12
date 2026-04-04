import { dbConnect } from "@/lib/dbConnect";

const careCollection = await dbConnect("babyCare");

// Data Get
export async function GET() {
  try {
    const result = await careCollection.find().toArray();

    return Response.json(result);
  } catch (error) {
    console.error("GET Error:", error);
    return Response.json({ message: "Failed to fetch data" }, { status: 500 });
  }
}

// Data Post
export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return Response.json(
        { message: "Please send a valid message" },
        { status: 400 },
      );
    }

    const newFeedback = {
      message,
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
