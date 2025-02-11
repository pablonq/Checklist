import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: "dyyz93t5j",
  api_key: "891523924429794",
  api_secret: "Tpxk74pDovENLdQY8d4E0xKGTzM",
});

export async function POST(request) {
  try {
    const data = await request.formData();
    const images = data.getAll("images");

    if (!images || images.size === 0) {
      throw new Error("No se ha proporcionado una imagen válida");
    }

    const uploadPromises = images.map(async (image) => {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "checklist-images", resource_type: "auto" },
          (error, result) => {
            if (error) {
              console.error("Error al subir imagen:", error);
              return reject(error);
            }
            resolve(result.secure_url);
          }
        ).end(buffer);
      });
    });



    // Esperar a que todas las imágenes se suban
    const urls = await Promise.all(uploadPromises);

    return NextResponse.json({
      message: "Imágenes subidas con éxito",
      urls,
    });
  } catch (error) {
    console.error("Error en backend:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
