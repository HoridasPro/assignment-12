import { dbConnect } from "@/lib/dbConnect";

const careCollection = await dbConnect("users");

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
