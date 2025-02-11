import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email.template";

// Configura la API Key de Resend (asegúrate de usar variables de entorno)
const resend = new Resend('re_J2Cpn78E_24vY7R4UARs5UVQ6h2tjpS7N');

export async function POST(request) {
  try {
    const { data, imageUrls, conductor, vehiculo } = await request.json(); // Recibir datos del frontend

    // Formatear los datos del formulario en texto HTML para el correo
    

    // Enviar el correo con Resend
    const emailResponse = await resend.emails.send({
      from: "onboarding@resend.dev", // Debe estar autorizado en Resend
      to: ["navarropabloq@gmail.com"], // Reemplaza con el email del receptor
      subject: "Nuevo Checklist Recibido",
      react: EmailTemplate({
        firstName: "Pablo",
        checklistData: data,
        transporte: vehiculo,
        chofer: conductor,
        imageUrls: imageUrls,
      }),
    });

    return NextResponse.json({ success: true, message: "Correo enviado correctamente", response: emailResponse });
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
