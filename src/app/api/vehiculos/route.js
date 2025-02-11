import next from "next";
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  const vehiculos = await prisma.vehiculo.findMany()
    
  
  return NextResponse.json(vehiculos);
}

export function POST() {
  return NextResponse.json("Enviando");
}