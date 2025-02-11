/*
  Warnings:

  - Added the required column `tacografoSatelital` to the `Checklist` table without a default value. This is not possible if the table is not empty.

*/
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
    "nivelFluidos" TEXT NOT NULL,
    "parabrisas" TEXT NOT NULL,
    "chapa" TEXT NOT NULL,
    "luces" TEXT NOT NULL,
    "identificacion" TEXT NOT NULL,
    "seguridad" TEXT NOT NULL,
    "sistemaFreno" TEXT NOT NULL,
    "ruedas" TEXT NOT NULL,
    "elementos" TEXT NOT NULL,
    "limpieza" TEXT NOT NULL,
    "observaciones" TEXT,
    "imagen" TEXT,
    "tacografoSatelital" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Checklist_conductorId_fkey" FOREIGN KEY ("conductorId") REFERENCES "Conductor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Checklist_vehiculoId_fkey" FOREIGN KEY ("vehiculoId") REFERENCES "Vehiculo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Checklist" ("chapa", "conductorId", "createdAt", "documentacionConductor", "documentacionVehiculo", "elementos", "fecha", "id", "identificacion", "imagen", "limpieza", "luces", "nivelFluidos", "observaciones", "parabrisas", "ruedas", "seguridad", "sistemaFreno", "tacografo", "vehiculoId") SELECT "chapa", "conductorId", "createdAt", "documentacionConductor", "documentacionVehiculo", "elementos", "fecha", "id", "identificacion", "imagen", "limpieza", "luces", "nivelFluidos", "observaciones", "parabrisas", "ruedas", "seguridad", "sistemaFreno", "tacografo", "vehiculoId" FROM "Checklist";
DROP TABLE "Checklist";
ALTER TABLE "new_Checklist" RENAME TO "Checklist";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
