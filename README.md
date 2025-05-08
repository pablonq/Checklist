# Proyecto: Checklist Transporte

## Descripción

Este proyecto es una aplicación web diseñada para gestionar y registrar checklists de transporte. Su objetivo principal es facilitar la inspección y el control de vehículos y conductores, asegurando que cumplan con los estándares de seguridad y mantenimiento requeridos.

La aplicación incluye funcionalidades como:
- Registro de conductores y vehículos.
- Creación de checklists detallados con observaciones específicas.
- Subida de imágenes relacionadas con los checklists.
- Envío de notificaciones por correo electrónico con los detalles del checklist.
- Gestión de datos mediante una base de datos SQLite utilizando Prisma como ORM.

## Tecnologías Utilizadas

- **Frontend**: Next.js, React, TailwindCSS.
- **Backend**: API Routes de Next.js.
- **Base de Datos**: SQLite con Prisma.
- **Almacenamiento de Imágenes**: Cloudinary.
- **Correo Electrónico**: Resend para el envío de emails.
- **Despliegue**: Compatible con Vercel.

## Funcionalidades Principales

1. **Gestión de Conductores y Vehículos**:
   - Listado de conductores y vehículos desde la base de datos.
   - Selección de conductores y vehículos para asociarlos a un checklist.

2. **Creación de Checklists**:
   - Formulario dinámico para registrar el estado de diferentes aspectos del vehículo, como:
     - Documentación del conductor y vehículo.
     - Estado de cristales, luces, ruedas, frenos, entre otros.
     - Observaciones adicionales.
   - Subida de imágenes relacionadas con el checklist.

3. **Validación y Almacenamiento**:
   - Validación de datos en el frontend y backend.
   - Almacenamiento de los checklists en la base de datos mediante Prisma.

4. **Notificaciones por Correo Electrónico**:
   - Envío automático de un correo electrónico con los detalles del checklist al completar el formulario.

5. **Subida de Imágenes**:
   - Compresión y redimensionamiento de imágenes antes de subirlas a Cloudinary.
   - Almacenamiento de las URLs de las imágenes en la base de datos.

## Estructura del Proyecto
├── prisma/
│   ├── schema.prisma       # Esquema de la base de datos
│   ├── dev.db              # Base de datos SQLite
├── public/                 # Archivos estáticos
├── src/
│   ├── app/
│   │   ├── api/            # Rutas API para manejar datos
│   │   ├── page.jsx        # Página principal con el formulario de checklist
│   │   ├── layout.jsx      # Layout principal de la aplicación
│   ├── components/         # Componentes reutilizables (e.g., plantillas de email)
├── .env                    # Variables de entorno
├── package.json            # Dependencias y scripts del proyecto
├── README.md               # Documentación del proyecto


## Instalación y Configuración

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd checklist

2. Instala las dependencias:
npm install

3. Configura las variables de entorno en el archivo .env:
DATABASE_URL="file:./prisma/dev.db"
CLOUDINARY_CLOUD_NAME="tu_cloud_name"
CLOUDINARY_API_KEY="tu_api_key"
CLOUDINARY_API_SECRET="tu_api_secret"
RESEND_API_KEY="tu_resend_api_key"

4. Ejecuta las migraciones de la base de datos:
npx prisma migrate dev --name init

5. Inicia el servidor de desarrollo:
npm run dev

6. Abre la aplicación en tu navegador en http://localhost:3000.

## Despliegue
El proyecto está optimizado para ser desplegado en Vercel. Sigue estos pasos para desplegar:
1. Conecta el repositorio a Vercel.
2. Configura las variables de entorno en el panel de Vercel.
3. Realiza el despliegue directamente desde la plataforma.
