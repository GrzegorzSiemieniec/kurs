import { NextRequest, NextResponse } from "next/server";
import connect from "../db";
import User from "../models/Users";

export const POST = async (request: any) => {
  const { email, password, name, surname } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("User is already Created", {
      status: 400,
    });
  }

  const newUser = new User({
    email,
    password,
    name,
    surname,
  });

  try {
    await newUser.save();
    return new NextResponse("User is created", {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
