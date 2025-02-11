import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, {params}) {
  const conductor = await prisma.conductor.findUnique({
    where: {
      id: Number(params.id)
    }
  })
    
  console.log(conductor);
  return NextResponse.json(conductor);
}