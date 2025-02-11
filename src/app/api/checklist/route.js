import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function POST(request) {
  try {
    const data = await request.json();
    
    /* if (!data || Object.keys(data).length === 0) {
      console.error("❌ Error: No se recibieron datos en la solicitud");
      return NextResponse.json({ error: "No se enviaron datos" }, { status: 400 });
    } */

    // Validar que los valores clave sean números enteros válidos
    if (!data.conductorId || isNaN(Number(data.conductorId))) {
      return NextResponse.json({ error: "conductorId debe ser un número válido" }, { status: 400 });
    }
    if (!data.vehiculoId || isNaN(Number(data.vehiculoId))) {
      return NextResponse.json({ error: "vehiculoId debe ser un número válido" }, { status: 400 });
    }
    if (!data.tacografo || isNaN(Number(data.tacografo))) {
      return NextResponse.json({ error: "tacografo debe ser un número válido" }, { status: 400 });
    }
    const imagenes = Array.isArray(data.imagenes) ? data.imagenes : [];
    

    // Validación de imagen: Si no es un string, convertirlo a ""
     /* const imagen = typeof data.imagen === "string" ? data.imagen : "";  */

    const newChecklist = await prisma.checklist.create({
      data: {
        conductorId: parseInt(data.conductorId, 10),
        vehiculoId: parseInt(data.vehiculoId, 10),
        tacografo: parseInt(data.tacografo, 10),
        documentacionConductor: data.documentacionConductor || "",
        documentacionVehiculo: data.documentacionVehiculo || "",
        cristales: data.cristales || "",
        nivelFluidos: data.nivelFluidos || "",
        luces: data.luces || "",
        chapa: data.chapa || "",
        seguridad: data.seguridad || "",
        ruedas: data.ruedas || "",
        sistemaFreno: data.sistemaFreno || "",
        elementos: data.elementos || "",
        limpieza: data.limpieza || "",
        tacografoSatelital: data.tacografoSatelital || "",
        observaciones: data.observaciones || "",
        imagenes: imagenes.length > 0 ? { create: imagenes.map((url) => ({ url })) } : undefined, // Solo crear si hay imágenes
      },
      include: {
        imagenes: true, // Incluir imágenes en la respuesta
      },
    });

    
    return NextResponse.json(newChecklist);
  } catch (error) {
    console.error("Error al crear checklist:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
