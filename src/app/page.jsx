"use client";

import React, { useState, useEffect } from 'react';


export default function ChecklistForm() {

  const [textareas, setTextareas] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [conductores, setConductores] = useState([]);
  const [file, setFile] = useState([]);
  const [textareaValues, setTextareaValues] = useState({});
  const [status, setStatus] = useState(""); 

  const [vehiculos, setVehiculos] = useState([]);
  const [selectedConductorId, setSelectedConductorId] = useState("");
  const [selectedVehiculo, setSelectedVehiculo] = useState("");
  const [selectedDocConductor, setSelectedDocConductor] = useState("");
  const [selectedDocVehiculo, setSelectedDocVehiculo] = useState("");
  const [selectedCristales, setSelectedCristales] = useState("");
  const [selectedFluidos, setSelectedFluidos] = useState("");
  const [selectedLuces, setSelectedLuces] = useState("");
  const [selectedChapa, setSelectedChapa] = useState("");
  const [selectedSeguridad, setSelectedSeguridad] = useState("");
  const [selectedRuedas, setSelectedRuedas] = useState("");
  const [selectedFrenos, setSelectedFrenos] = useState("");
  const [selectedElementos, setSelectedElementos] = useState("");
  const [selectedLimpieza, setSelectedLimpieza] = useState("");
  const [selectedTacografo, setSelectedTacografo] = useState("");
  const [tacografoObservacion, setTacografoObservacion] = useState("");

  async function loadConductores() {
    try {
      const response = await fetch('/api/conductores');
      const data = await response.json();

      setConductores(data);
    } catch (error) {
      console.error('Error al cargar conductores:', error);
    }
  }


  async function loadVehiculos() {
    try {
      const response = await fetch('/api/vehiculos');
      const data = await response.json();
      setVehiculos(data);
    } catch (error) {
      console.error('Error al cargar vehiculos:', error);
    }
  }


/*   const toggleTextarea = (field) => {
    setTextareas((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  }; */

  useEffect(() => {
    const fetchData = async () => {
      await loadConductores();
      await loadVehiculos();
    };
    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelectedValues((prev) => ({ ...prev, [name]: value }));

    if (value === "Observacion") {
      setTextareas((prev) => ({ ...prev, [name]: true }));
    } else {
      setTextareas((prev) => ({ ...prev, [name]: false }));
      setTextareaValues((prev) => ({ ...prev, [name]: "" })); // Resetear observación
    }
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setTextareaValues((prev) => ({ ...prev, [name]: value })); // Actualiza solo el texto del textarea
  };
  // Buscar el conductor completo a partir del id seleccionado
  const selectedConductor = conductores.find(
    (conductor) => conductor.id === Number(selectedConductorId)
  );

  const vehiculoSelected = vehiculos.find(
    (vehiculo) => vehiculo.id === Number(selectedVehiculo)
  );

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFile((prevFiles) => [...prevFiles, ...files]); // Agregar imágenes sin reemplazar las anteriores
  };

  const removeImage = (index) => {
    setFile((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Eliminar imagen por índice
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    const conductor = { nombre: selectedConductor.nombre, apellido: selectedConductor.apellido, dni: selectedConductor.dni };
    const vehiculo = {marca: vehiculoSelected.marca, dominio: vehiculoSelected.dominio};
    
    const finalValues = { ...selectedValues };
    Object.keys(textareaValues).forEach((key) => {
      if (selectedValues[key] === "Observacion" && textareaValues[key].trim() !== "") {
        finalValues[key] = `Observacion: ${textareaValues[key]}`;
      }
    });

    const formData = new FormData();
    file.forEach((image) => formData.append("images", image)); // Adjuntar todas las imágenes


    try {
      let imageUrls = [];
      if (file.length > 0) {
        // Subir la imagen al backend
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || "Error desconocido en la subida de imagen");
        }

        const uploadData = await uploadResponse.json();
        imageUrls = uploadData.urls;

        if (!imageUrls || imageUrls.length === 0) {
          throw new Error("No se obtuvo URL de la imagen");
        }
      }

      // Recopilar los datos del formulario
      const data = {
        conductorId: event.target.conductorId.value,
        vehiculoId: event.target.vehiculoId.value,
        tacografo: event.target.tacografo.value,

        documentacionConductor: selectedValues.docConductor === "Observacion" && textareaValues.docConductor
        ? `Observacion: ${textareaValues.docConductor}`: selectedValues.docConductor,

        documentacionVehiculo: selectedValues.docVehiculo === "Observacion" && textareaValues.docVehiculo
        ? `Observacion: ${textareaValues.docVehiculo}`: selectedValues.docVehiculo, 

        cristales: selectedValues.cristales === "Observacion" && textareaValues.cristales
        ? `Observacion: ${textareaValues.cristales}`: selectedValues.cristales,

        nivelFluidos: selectedValues.nivelFluidos === "Observacion" && textareaValues.nivelFluidos
        ? `Observacion: ${textareaValues.nivelFluidos}`: selectedValues.nivelFluidos,

        luces: selectedValues.luces === "Observacion" && textareaValues.luces
        ? `Observacion: ${textareaValues.luces}`: selectedValues.luces,

        chapa: selectedValues.chapa === "Observacion" && textareaValues.chapa
        ? `Observacion: ${textareaValues.chapa}`: selectedValues.chapa,

        seguridad: selectedValues.seguridad === "Observacion" && textareaValues.seguridad
        ? `Observacion: ${textareaValues.seguridad}`: selectedValues.seguridad,

        ruedas: selectedValues.ruedas === "Observacion" && textareaValues.ruedas
        ? `Observacion: ${textareaValues.ruedas}`: selectedValues.ruedas,

        sistemaFreno: selectedValues.sistemaFreno === "Observacion" && textareaValues.sistemaFreno
        ? `Observacion: ${textareaValues.sistemaFreno}`: selectedValues.sistemaFreno,

        elementos: selectedValues.elementos === "Observacion" && textareaValues.elementos
        ? `Observacion: ${textareaValues.elementos}`: selectedValues.elementos,

        limpieza: selectedValues.limpieza === "Observacion" && textareaValues.limpieza
        ? `Observacion: ${textareaValues.limpieza}`: selectedValues.limpieza,

        tacografoSatelital:selectedValues.tacografoSatelital === "Observacion" && textareaValues.tacografoSatelital
        ? `Observacion: ${textareaValues.tacografoSatelital}`
        : selectedValues.tacografoSatelital,
        
        observaciones: event.target.observaciones.value,
        imagenes: imageUrls, // Guardar la URL de la imagen
      };

      

      // Enviar el formulario completo
      const res = await fetch("/api/checklist", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      

      if (!res.ok) {
        const errorRes = await res.json();
        throw new Error(errorRes.error || "Error al enviar el formulario");
      }

      const resData = await res.json();

      const emailResponse = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({ data, imageUrls, conductor, vehiculo }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!emailResponse.ok) {
        const errorEmail = await emailResponse.json();
        throw new Error(errorEmail.error || "Error al enviar el correo");
      }
  setStatus("success"); // Muestra "Checklist Enviado"
      const resEmailData = await emailResponse.json();
      console.log("✅ Correo enviado correctamente:", resEmailData);
      console.log("Respuesta del servidor:", resData);
    } catch (error) {
      console.error("Error en la subida:", error);
    }

  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
    {/* <div className="flex justify-center items-center min-h-screen bg-gray-100 my-10"> */}
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md">
    
    {/* Pantalla de carga */}
      {status === "loading" && <h2 className="text-blue-500 text-4xl">Enviando...</h2>}

      {/* Pantalla de éxito */}
      {status === "success" && <h2 className="text-green-500 text-4xl">✅ Checklist Enviado</h2>}

      {/* Mostrar el formulario solo si no está enviando ni ha sido enviado */}
      {status === "" && (
      <form className="p-5 border-8 border-black rounded-md shadow-lg max-w-lg mx-auto"
        onSubmit={onSubmit}>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center">CHECKLIST TRANSPORTE</h2>
        <div className="my-4 border-4 border-slate-800 rounded-md">

          {/* Conductor */}
          <div className="text-center">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Conductor</label>
            <select
              required
              name='conductorId'
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              value={selectedConductorId}
              onChange={(e) => setSelectedConductorId(e.target.value)}
            >
              <option value="" disabled>
                Seleccionar
              </option>
              {conductores.map((conductor) => (
                <option key={conductor.id} value={conductor.id}>
                  {conductor.nombre}, {conductor.apellido}
                </option>
              ))}
            </select>
            {selectedConductor && (
              <p className="mt-2 text-gray-700 dark:text-gray-300">DNI: {selectedConductor.dni}</p>
            )}
          </div>

          {/* Vehiculo */}
          <div className="text-center mt-4">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Vehículo</label>
            <select
              required
              name='vehiculoId'
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              value={selectedVehiculo}
              onChange={(e) => setSelectedVehiculo(e.target.value)}
            >
              <option value="" disabled>
                Seleccionar
              </option>
              {vehiculos.map((vehiculo) => (
                <option key={vehiculo.id} value={vehiculo.id}>
                  {vehiculo.dominio} - {vehiculo.marca}
                </option>
              ))}
            </select>
          </div>

          {/* tacografo */}
          <div className="text-center my-4">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Cantidad de Kilómetros</label>

            <input required name="tacografo" type="number" className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" placeholder='100000' min="0" />
          </div>
        </div>

        {/* Documentacion Conductor */}
        <div className="mt-4 border-y-4 border-y-slate-950  rounded-md">
          <h2 className="block text-gray-700 dark:text-gray-300 text-xl text-center">DOCUMENTACIÓN</h2>

          <div className="text-center mt-4">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Documentación Conductor</label>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">MD / LIC. CONDUCIR / CERTIFICACION</p>
            <select
              required
              name="docConductor"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              value={selectedValues.docConductor || ""}
              onChange={handleSelectChange}            >
              <option value="" disabled >Seleccionar</option>
              <option value="Completa">Completa</option>
              <option value="Observacion">Observación</option>
            </select>
            {textareas.docConductor && (
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ingrese la documentación faltante"
                name="docConductor"
                value={textareaValues.docConductor || ""}
                onChange={handleTextareaChange}
              ></textarea>
            )}
          </div>

          {/* Documentacion Vehiculo */}
          <div className="text-center my-4 ">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Documentación Vehículo</label>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">TARJ. VERDE / VTV / SEGURO / PAGO PATENTE</p>
            <select
              required
              name="docVehiculo"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              value={selectedValues.docVehiculo || ""}
              onChange={handleSelectChange}
            >
              <option value="" disabled>Seleccionar</option>
              <option value="Completa">Completa</option>
              <option value="Observacion">Observación</option>
            </select>
            {textareas.docVehiculo && (
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ingrese la documentación faltante"
                name="docVehiculo"
                value={textareaValues.docVehiculo || ""}
                onChange={handleTextareaChange}
              ></textarea>
            )}
          </div>

        </div>


        <div className="mt-4 ">
          <h2 className="block text-gray-700 dark:text-gray-300 text-xl text-center">ESTADO GENERAL</h2>

          {/* Cristales */}
          <div className="text-center mt-4">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Cristales</label>
            <p className="text-xs text-gray-600 mb-2 dark:text-gray-300 ">PARABRISAS / LUNETA / LATERALES / RETROVISORES</p>
            <select
              required
              name="cristales"
              value={selectedValues.cristales || ""}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={handleSelectChange}
            >
              <option value="" disabled >Seleccionar</option>
              <option value="Bien">Bien</option>
              <option value="Observacion">Observación</option>
            </select>
            {textareas.cristales && (
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ingrese elementos faltantes o dañados"
                name="cristales"
                value={textareaValues.cristales || ""}
                onChange={handleTextareaChange}
              ></textarea>
            )}
          </div>

          {/*Nivel de Fluidos */}
          <div className="text-center mt-4">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Nivel de Fluidos</label>
            <p className="text-xs text-gray-600 mb-2 dark:text-gray-300 ">ACEITE / AGUA / FRENO / ZORRINO</p>
            <select
              required
              name="nivelFluidos"
              value={selectedValues.nivelFluidos || ""}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={handleSelectChange}
            >
              <option value="" disabled >Seleccionar</option>
              <option value="Bien">Bien</option>
              <option value="Observacion">Observación</option>
            </select>
            {textareas.nivelFluidos && (
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ingrese el nivel de fluido insuficiente"
                name="nivelFluidos"
                value={textareaValues.nivelFluidos || ""}
                onChange={handleTextareaChange}
              ></textarea>
            )}
          </div>

          {/* Luces */}
          <div className="text-center mt-4">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Luces</label>
            <p className="text-xs text-gray-600 dark:text-gray-300  mb-2">ALTA / BAJA / RETROCESO / BALIZAS / FRENO / POSICIÓN / GUIÑE / INTERIOR / ANTI NIEBLA</p>
            <select
              required
              name="luces"
              value={selectedValues.luces || ""}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={handleSelectChange}
            >
              <option value="" disabled >Seleccionar</option>
              <option value="Bien">Bien</option>
              <option value="Observacion">Observación</option>
            </select>
            {textareas.luces && (
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ingrese elementos faltantes o dañados"
                name="luces"
              value={textareaValues.luces || ""}
                onChange={handleTextareaChange}
              ></textarea>
            )}
          </div>

          {/* Chapa */}
          <div className="text-center mt-4">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Chapa</label>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">PARAGOLPES / GUARDABARROS / PINTURA GRAL</p>
            <select
              required
              name="chapa"
              value={selectedValues.chapa || ""}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={handleSelectChange}
            >
              <option value="" disabled >Seleccionar</option>
              <option value="Bien">Bien</option>
              <option value="Observacion">Observación</option>
            </select>
            {textareas.chapa && (
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ingrese elementos faltantes o dañados"
                name="chapa"
                value={textareaValues.chapa || ""}
                onChange={handleTextareaChange}
              ></textarea>
            )}
          </div>

          {/* Seguridad */}
          <div className="text-center mt-4">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Seguridad</label>
            <p className="text-xs text-gray-600 mb-2 dark:text-gray-300 ">CINTURON / APOYACABEZAS / BOTIQUIN / BANDAS REFLECTIVAS / ALARMA RETROCESO / BOCINA / MATAFUEGO / BALIZAS</p>
            <select
              required
              name="seguridad"
              value={selectedValues.seguridad || ""}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={handleSelectChange}
            >
              <option value="" disabled >Seleccionar</option>
              <option value="Bien">Bien</option>
              <option value="Observacion">Observación</option>
            </select>
            {textareas.seguridad && (
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ingrese elementos faltantes o dañados"
                name="seguridad"
                value={textareaValues.seguridad || ""}
                onChange={handleTextareaChange}
              ></textarea>
            )}
          </div>

          {/* Ruedas */}
          <div className="text-center mt-4">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Ruedas</label>
            <p className="text-xs text-gray-600 mb-2 dark:text-gray-300 ">ESTADO GRAL / ALINEACIÓN Y BANLANCEO / PRESION / RUEDA AUXILIO / CRIQUET / LLAVE</p>
            <select
              required
              name="ruedas"
              value={selectedValues.ruedas || ""}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={handleSelectChange}
            >

              <option value="" disabled >Seleccionar</option>
              <option value="Bien">Bien</option>
              <option value="Observacion">Observación</option>
            </select>
            {textareas.ruedas && (
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ingrese elementos faltantes o dañados"
                name="ruedas"
                value={textareaValues.ruedas || ""}
                onChange={handleTextareaChange}
              ></textarea>
            )}
          </div>

          {/* Frenos */}
          <div className="text-center mt-4">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Frenos</label>
            <p className="text-xs text-gray-600 mb-2 dark:text-gray-300 ">SISTEMA DE FRENOS / FRENO DE MANO</p>
            <select

              required
              name="sistemaFreno"
              value={selectedValues.sistemaFreno || ""}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={handleSelectChange}
            >
              <option value="" disabled >Seleccionar</option>
              <option value="Bien">Bien</option>
              <option value="Observacion">Observación</option>
            </select>
            {textareas.sistemaFreno && (
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ingrese sistema de frenos insuficiente"
                name="sistemaFreno"
                value={textareaValues.sistemaFreno || ""}
                onChange={handleTextareaChange}
              ></textarea>
            )}
          </div>

          {/* Elementos */}
          <div className="text-center mt-4">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Elementos Varios</label>
            <p className="text-xs text-gray-600 mb-2 dark:text-gray-300 ">PATENTE / EQUIPO DE RADIO / ESTADO ASIENTOS / CERRADURAS / CALEFACCIÓN / AIRE ACONDICIONADO / INDICADORES EN TABLERO</p>
            <select
              required
              name='elementos'
              value={selectedValues.elementos || ""}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={handleSelectChange}
            >
              <option value="" disabled >Seleccionar</option>
              <option value="Bien">Bien</option>
              <option value="Observacion">Observación</option>
            </select>
            {textareas.elementos && (
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ingrese elementos faltantes o dañados"
                name="elementos"
                value={textareaValues.elementos || ""}
                onChange={handleTextareaChange}
              ></textarea>
            )}
          </div>

          {/* Limpieza */}
          <div className="text-center mt-4">
            <label className="bblock text-gray-700 dark:text-gray-300 text-xl">Orden y Limpieza</label>
            {/* <p className="text-sm text-gray-600 mb-2">Seleccione el estado de limpieza del vehículo.</p> */}
            <select
              required
              name="limpieza"
              value={selectedValues.limpieza || ""}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={handleSelectChange}
            >
              <option value="" disabled >Seleccionar</option>
              <option value="Bien">Bien</option>
              <option value="Observacion">Observación</option>
            </select>
            {textareas.limpieza && (
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ingrese detalles sobre la falta de limpieza y orden"
                name="limpieza"
                value={textareaValues.limpieza || ""}
                onChange={handleTextareaChange}
              ></textarea>
            )}
          </div>

          {/* Tacografo Satelital */}
          <div className="text-center mt-4">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Tacografo Satelital</label>
            {/* <p className="text-sm text-gray-600 mb-2">Seleccione el estado de limpieza del vehículo.</p> */}
            <select
              required
              name="tacografoSatelital"
              value={selectedValues.tacografoSatelital || ""}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={handleSelectChange}
            >
              <option value="" disabled >Seleccionar</option>
              <option value="Bien">Bien</option>
              <option value="Observacion">Observación</option>
            </select>
            {textareas.tacografoSatelital && (
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ingrese detalles sobre el tacógrafo"
                name="tacografoSatelital"
                value={textareaValues.tacografoSatelital || ""}
                onChange={handleTextareaChange}
              ></textarea>
            )}
          </div>

          {/* Observaciones */}
          <div className="text-center mt-4">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Observaciones Adicionales (opcional)</label>
            <textarea
              name="observaciones"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ingrese observaciones adicionales si fuera necesario"
            ></textarea>
          </div>

          <div className="text-center mt-4">
            <label className="block text-gray-700 dark:text-gray-300 text-xl">Subir imagen (opcional)</label>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Adjunte una imagen si es necesario.</p>
            <input type="file" multiple onChange={handleFileChange} />
            <div>
              {file.map((image, index) => (
                <div key={index}>
                  <span>{image.name}</span>
                  <button type="button" onClick={() => removeImage(index)}>❌</button>
                </div>
              ))}
            </div>
          </div>

        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white p-3 rounded-lg font-semibold mt-3"
        >
          Enviar Checklist
        </button>
      </form>
      )}
    </div>
    </div>
  );
}