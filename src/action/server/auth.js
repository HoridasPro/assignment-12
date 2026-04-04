"use server";

import { dbConnect } from "@/lib/dbConnect";

export const postUsers = async (payload) => {
  try {
    const collection = await dbConnect("babyCare");

    const newBabyCare = {
      service: payload.service,
      type: payload.type,
      amount: payload.amount,
      role: "user",
      division: payload.division,
      district: payload.district,
      city: payload.city,
      address: payload.address,
      total: payload.total,
      status: "pending",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newBabyCare);

    if (result.acknowledged) {
      return {
        success: true,
        message: "Baby Booking successfully",
      };
    }
    return {
      success: false,
      message: "Insert failed",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "An error occurred during registration.",
    };
  }
};
