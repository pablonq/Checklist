/*
  Warnings:

  - You are about to drop the column `imagen` on the `Checklist` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Imagen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "checklistId" INTEGER NOT NULL,
    CONSTRAINT "Imagen_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Checklist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conductorId" INTEGER NOT NULL,
    "vehiculoId" INTEGER NOT NULL,
    "tacografo" INTEGER NOT NULL,
    "documentacionConductor" TEXT NOT NULL,
    "documentacionVehiculo" TEXT NOT NULL,
    "cristales" TEXT NOT NULL,
    "nivelFluidos" TEXT NOT NULL,
    "luces" TEXT NOT NULL,
    "chapa" TEXT NOT NULL,
    "seguridad" TEXT NOT NULL,
    "ruedas" TEXT NOT NULL,
    "sistemaFreno" TEXT NOT NULL,
    "elementos" TEXT NOT NULL,
    "limpieza" TEXT NOT NULL,
    "tacografoSatelital" TEXT NOT NULL,
    "observaciones" TEXT,
    CONSTRAINT "Checklist_conductorId_fkey" FOREIGN KEY ("conductorId") REFERENCES "Conductor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Checklist_vehiculoId_fkey" FOREIGN KEY ("vehiculoId") REFERENCES "Vehiculo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Checklist" ("chapa", "conductorId", "cristales", "documentacionConductor", "documentacionVehiculo", "elementos", "fecha", "id", "limpieza", "luces", "nivelFluidos", "observaciones", "ruedas", "seguridad", "sistemaFreno", "tacografo", "tacografoSatelital", "vehiculoId") SELECT "chapa", "conductorId", "cristales", "documentacionConductor", "documentacionVehiculo", "elementos", "fecha", "id", "limpieza", "luces", "nivelFluidos", "observaciones", "ruedas", "seguridad", "sistemaFreno", "tacografo", "tacografoSatelital", "vehiculoId" FROM "Checklist";
DROP TABLE "Checklist";
ALTER TABLE "new_Checklist" RENAME TO "Checklist";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
