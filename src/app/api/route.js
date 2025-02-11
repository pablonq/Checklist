import { prisma } from "@/libs/prisma"; // Asegúrate de que la ruta a tu instancia de prisma sea la correcta.

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        conductorId,
        vehiculoId,
        docConductor,
        docVehiculo,
        nivelFluidos,
        parabrisas,
        paragolpes,
        luces,
        bocina,
        seguridad,
        sistemaFreno,
        ruedas,
        elementos,
        tacografo,
        tacografoSatelital,
        observaciones,
        limpieza,
      } = req.body;

     
      const newChecklist = await prisma.checklist.create({
        data: {
          conductorId: Number(conductorId),
          vehiculoId: Number(vehiculoId),
          documentacionConductor: docConductor,
          documentacionVehiculo: docVehiculo,
          nivelFluidos: nivelFluidos,
          parabrisas: parabrisas,
          paragolpes: paragolpes,
          luces: luces ,
          bocina: bocina,
          seguridad: seguridad,
          sistemaFreno: sistemaFreno,
          ruedas: ruedas,
          elementos: elementos,
          tacografo: Number (tacografo),
          tacografoSatelital: tacografoSatelital,
          observaciones,
          limpieza: limpieza,
        },
      });

      return res.status(200).json(newChecklist);
    } catch (error) {
      console.error("Error al crear checklist:", error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}
