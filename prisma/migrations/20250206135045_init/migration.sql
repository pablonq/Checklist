-- CreateTable
CREATE TABLE "Conductor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Vehiculo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "dominio" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Checklist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conductorId" INTEGER NOT NULL,
    "vehiculoId" INTEGER NOT NULL,
    "tacografo" INTEGER NOT NULL,
    "documentacionConductor" TEXT NOT NULL,
    "documentacionVehiculo" TEXT NOT NULL,
    "nivelFluidos" TEXT NOT NULL,
    "parabrisas" TEXT NOT NULL,
    "chapa" TEXT NOT NULL,
    "luces" TEXT NOT NULL,
    "bocina" TEXT NOT NULL,
    "identificacion" TEXT NOT NULL,
    "seguridad" TEXT NOT NULL,
    "sistemaFreno" TEXT NOT NULL,
    "ruedas" TEXT NOT NULL,
    "elementos" TEXT NOT NULL,
    "limpieza" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Checklist_conductorId_fkey" FOREIGN KEY ("conductorId") REFERENCES "Conductor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Checklist_vehiculoId_fkey" FOREIGN KEY ("vehiculoId") REFERENCES "Vehiculo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Conductor_dni_key" ON "Conductor"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_dominio_key" ON "Vehiculo"("dominio");
