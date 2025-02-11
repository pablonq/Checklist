import PropTypes from "prop-types";

export const EmailTemplate = ({ firstName, checklistData, transporte, chofer, imageUrls }) => (
  <div>
    <h1>Hola, {firstName}!</h1>
    
    
    <h2>Detalles del Checklist</h2>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        border: "1px solid #ddd",
      }}
    >
      <tbody>
        {Object.entries({
          "Conductor": chofer.nombre + " " + chofer.apellido + " (DNI: " + chofer.dni + ")",
          "Transporte": transporte.marca + " (Patente: " + transporte.dominio + ")",
          "Kilómetros": checklistData.tacografo + " Km",
          "Documentación del Conductor (MD / LIC. CONDUCIR / CERTIFICACION)": checklistData.documentacionConductor,
          "Documentación del Vehículo (TARJ. VERDE / VTV / SEGURO / PAGO PATENTE)": checklistData.documentacionVehiculo,
          "Cristales (PARABRISAS / LUNETA / LATERALES / RETROVISORES)": checklistData.cristales,
          "Nivel de Fluidos (ACEITE / AGUA / FRENOS / ZORRINO)": checklistData.nivelFluidos,
          "Luces (ALTA / BAJA / RETROCESO / BALIZAS / FRENO / POSICIÓN / GUIÑE / INTERIOR / ANTI NIEBLA)": checklistData.luces,
          "Chapa (PARAGOLPES / GUARDABARROS / PINTURA GRAL.)": checklistData.chapa,
          "Seguridad (CINTURON / APOYACABEZAS / BOTIQUIN / BANDAS REFLECTIVAS / ALARMA RETROCESO / BOCINA / MATAFUEGO / BALIZAS)": checklistData.seguridad,
          "Ruedas (ESTADO GRAL / ALINEACIÓN Y BANLANCEO / PRESION / RUEDA AUXILIO / CRIQUET / LLAVE)": checklistData.ruedas,
          "Frenos (SISTEMA DE FRENOS / FRENO DE MANO)": checklistData.sistemaFreno,
          "Elementos Varios (PATENTE / EQUIPO DE RADIO / ESTADO ASIENTOS / CERRADURAS / CALEFACCIÓN / AIRE ACONDICIONADO / INDICADORES EN TABLERO)": checklistData.elementos,
          "Orden y Limpieza": checklistData.limpieza,
          "Tacógrafo Satelital": checklistData.tacografoSatelital,
          "Observaciones Varias": checklistData.observaciones || "Ninguna",
        }).map(([key, value], index) => (
          <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
            <th
              style={{
                width: "40%",
                textAlign: "left",
                padding: "8px",
                backgroundColor: "#f4f4f4",
                fontWeight: "bold",
              }}
            >
              {key}
            </th>
            <td style={{ padding: "8px", width: "60%" }}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <h3>Imágenes Adjuntas:</h3>
    {imageUrls.length > 0 ? (
      imageUrls.map((url, index) => (
        <p key={index}>
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        </p>
      ))
    ) : (
      <p>No se adjuntaron imágenes.</p>
    )}
  </div>
);

EmailTemplate.propTypes = {
  firstName: PropTypes.string.isRequired,
  checklistData: PropTypes.object.isRequired,
  imageUrls: PropTypes.array.isRequired,
};
