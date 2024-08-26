import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    cookies().delete("session");

    return Response.json({ message: "Logged out successfully" });
    
  } catch (error: any) {
    return Response.json(error);
    
  }
}