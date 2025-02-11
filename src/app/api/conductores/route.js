import next from "next";
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  const conductores = await prisma.conductor.findMany()
    
  
  return NextResponse.json(conductores);
}

export function POST() {
  return NextResponse.json("Enviando");
}