/* empty css                                 */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B4bjZISI.mjs';
import 'piccolore';
import { s as supabase, $ as $$Layout } from '../chunks/Layout_Qfaif4Qm.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { L as LogoutButton } from '../chunks/LogoutButton_DMx9gjLR.mjs';
export { renderers } from '../renderers.mjs';

const VehicleInventory = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [priceData, setPriceData] = useState({
    precio: "",
    descuento_porcentaje: ""
  });
  const [formData, setFormData] = useState({
    marca: "",
    modelo_año: "",
    precio: "",
    estado: "disponible",
    tipo: "",
    cilindraje: "",
    linea: "",
    origen: "",
    motor: "",
    combustible: "",
    transmision: "",
    marchas: "",
    recorrido: "",
    extras: "",
    detalles: ""
  });
  useEffect(() => {
    fetchVehicles();
  }, []);
  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase.from("vehicles").select("*").order("created_at", { ascending: false });
      if (fetchError) throw fetchError;
      setVehicles(data || []);
    } catch (err) {
      setError(err.message || "Error al cargar vehículos");
    } finally {
      setLoading(false);
    }
  };
  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const imageUrls = [];
      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const fileName = `${Date.now()}_${file.name}`;
          const { data: uploadData, error: uploadError } = await supabase.storage.from("vehicle-images").upload(fileName, file, {
            cacheControl: "3600",
            upsert: false
          });
          if (uploadError) throw uploadError;
          const { data: publicUrlData } = supabase.storage.from("vehicle-images").getPublicUrl(fileName);
          imageUrls.push(publicUrlData.publicUrl);
        }
      }
      const { error: insertError } = await supabase.from("vehicles").insert({
        marca: formData.marca || "",
        modelo_año: formData.modelo_año || "",
        precio: parseFloat(formData.precio) || 0,
        estado: formData.estado || "disponible",
        tipo: formData.tipo || "",
        imagenes: imageUrls.length > 0 ? imageUrls : [],
        cilindraje: parseFloat(formData.cilindraje) || 0,
        linea: formData.linea || "",
        origen: formData.origen || "",
        motor: formData.motor || "",
        combustible: formData.combustible || "",
        transmision: formData.transmision || "",
        marchas: parseInt(formData.marchas) || 0,
        recorrido: parseFloat(formData.recorrido) || 0,
        extras: formData.extras || "",
        detalles: formData.detalles || "",
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      });
      if (insertError) throw insertError;
      setFormData({
        marca: "",
        modelo_año: "",
        precio: "",
        estado: "disponible",
        tipo: "",
        cilindraje: "",
        linea: "",
        origen: "",
        motor: "",
        combustible: "",
        transmision: "",
        marchas: "",
        recorrido: "",
        extras: "",
        detalles: ""
      });
      setImageFiles([]);
      setShowModal(false);
      fetchVehicles();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };
  const handleImageChange = (e) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-blue-500", "bg-blue-50");
  };
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("border-blue-500", "bg-blue-50");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-blue-500", "bg-blue-50");
    const files = e.dataTransfer.files;
    if (files) {
      const imageFiles2 = Array.from(files).filter((file) => file.type.startsWith("image/"));
      if (imageFiles2.length > 0) {
        setImageFiles(imageFiles2);
      } else {
        setError("Solo se permiten archivos de imagen");
      }
    }
  };
  const removeImage = (index) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };
  const handleAddImagesToVehicle = async () => {
    if (!selectedVehicleId || imageFiles.length === 0) return;
    setUploading(true);
    try {
      const vehicle = vehicles.find((v) => v.id === selectedVehicleId);
      const existingImages = vehicle?.imagenes || [];
      const imageUrls = [...existingImages];
      for (const file of imageFiles) {
        const fileName = `${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage.from("vehicle-images").upload(fileName, file, {
          cacheControl: "3600",
          upsert: false
        });
        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage.from("vehicle-images").getPublicUrl(fileName);
        imageUrls.push(publicUrlData.publicUrl);
      }
      const { error: updateError } = await supabase.from("vehicles").update({ imagenes: imageUrls }).eq("id", selectedVehicleId);
      if (updateError) throw updateError;
      setImageFiles([]);
      setShowImageModal(false);
      setSelectedVehicleId(null);
      fetchVehicles();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };
  const handleChangeStatus = async (id, newStatus) => {
    try {
      const { error: updateError } = await supabase.from("vehicles").update({ estado: newStatus }).eq("id", id);
      if (updateError) throw updateError;
      fetchVehicles();
    } catch (err) {
      setError(err.message);
    }
  };
  const handleDeleteVehicle = async (id) => {
    if (!confirm("¿Eliminar este vehículo?")) return;
    try {
      const { error: deleteError } = await supabase.from("vehicles").delete().eq("id", id);
      if (deleteError) throw deleteError;
      fetchVehicles();
    } catch (err) {
      setError(err.message);
    }
  };
  const handleOpenPriceModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setPriceData({
      precio: vehicle.precio_original?.toString() || vehicle.precio.toString(),
      descuento_porcentaje: vehicle.descuento_porcentaje?.toString() || ""
    });
    setShowPriceModal(true);
  };
  const handleUpdatePrice = async () => {
    if (!selectedVehicle) return;
    try {
      const precioOriginal = parseFloat(priceData.precio);
      const descuento = parseFloat(priceData.descuento_porcentaje) || 0;
      if (isNaN(precioOriginal) || precioOriginal <= 0) {
        setError("El precio debe ser un número válido mayor a 0");
        return;
      }
      if (descuento < 0 || descuento > 100) {
        setError("El descuento debe estar entre 0 y 100");
        return;
      }
      const precioFinal = descuento > 0 ? precioOriginal * (1 - descuento / 100) : precioOriginal;
      const { error: updateError } = await supabase.from("vehicles").update({
        precio_original: precioOriginal,
        precio: precioFinal,
        descuento_porcentaje: descuento > 0 ? descuento : null
      }).eq("id", selectedVehicle.id);
      if (updateError) throw updateError;
      setShowPriceModal(false);
      setSelectedVehicle(null);
      setPriceData({ precio: "", descuento_porcentaje: "" });
      fetchVehicles();
    } catch (err) {
      setError(err.message);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "Cargando vehículos..." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Inventario de Vehículos" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowModal(true),
          className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition",
          children: "+ Agregar Vehículo"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded", children: error }),
    showModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-6", children: "Agregar Vehículo" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleAddVehicle, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Marca *",
              value: formData.marca,
              onChange: (e) => setFormData({ ...formData, marca: e.target.value }),
              className: "w-full px-3 py-2 border rounded-lg",
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Modelo/Año *",
              value: formData.modelo_año,
              onChange: (e) => setFormData({ ...formData, modelo_año: e.target.value }),
              className: "w-full px-3 py-2 border rounded-lg",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Línea",
              value: formData.linea,
              onChange: (e) => setFormData({ ...formData, linea: e.target.value }),
              className: "w-full px-3 py-2 border rounded-lg"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              placeholder: "Precio *",
              value: formData.precio,
              onChange: (e) => setFormData({ ...formData, precio: e.target.value }),
              className: "w-full px-3 py-2 border rounded-lg",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: formData.tipo,
              onChange: (e) => setFormData({ ...formData, tipo: e.target.value }),
              className: "w-full px-3 py-2 border rounded-lg",
              required: true,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Tipo de vehículo *" }),
                /* @__PURE__ */ jsx("option", { value: "Sedán", children: "Sedán" }),
                /* @__PURE__ */ jsx("option", { value: "SUV", children: "SUV" }),
                /* @__PURE__ */ jsx("option", { value: "Pickup", children: "Pickup" }),
                /* @__PURE__ */ jsx("option", { value: "Hatchback", children: "Hatchback" }),
                /* @__PURE__ */ jsx("option", { value: "Coupé", children: "Coupé" }),
                /* @__PURE__ */ jsx("option", { value: "Convertible", children: "Convertible" }),
                /* @__PURE__ */ jsx("option", { value: "Van", children: "Van" }),
                /* @__PURE__ */ jsx("option", { value: "Camión", children: "Camión" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: formData.estado,
              onChange: (e) => setFormData({ ...formData, estado: e.target.value }),
              className: "w-full px-3 py-2 border rounded-lg",
              children: [
                /* @__PURE__ */ jsx("option", { value: "disponible", children: "Disponible" }),
                /* @__PURE__ */ jsx("option", { value: "vendido", children: "Vendido" }),
                /* @__PURE__ */ jsx("option", { value: "reservado", children: "Reservado" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Origen",
              value: formData.origen,
              onChange: (e) => setFormData({ ...formData, origen: e.target.value }),
              className: "w-full px-3 py-2 border rounded-lg"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Motor",
              value: formData.motor,
              onChange: (e) => setFormData({ ...formData, motor: e.target.value }),
              className: "w-full px-3 py-2 border rounded-lg"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: formData.combustible,
              onChange: (e) => setFormData({ ...formData, combustible: e.target.value }),
              className: "w-full px-3 py-2 border rounded-lg",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Combustible" }),
                /* @__PURE__ */ jsx("option", { value: "Gasolina", children: "Gasolina" }),
                /* @__PURE__ */ jsx("option", { value: "Diésel", children: "Diésel" }),
                /* @__PURE__ */ jsx("option", { value: "Eléctrico", children: "Eléctrico" }),
                /* @__PURE__ */ jsx("option", { value: "Híbrido", children: "Híbrido" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: formData.transmision,
              onChange: (e) => setFormData({ ...formData, transmision: e.target.value }),
              className: "w-full px-3 py-2 border rounded-lg",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Transmisión" }),
                /* @__PURE__ */ jsx("option", { value: "Manual", children: "Manual" }),
                /* @__PURE__ */ jsx("option", { value: "Automática", children: "Automática" }),
                /* @__PURE__ */ jsx("option", { value: "CVT", children: "CVT" }),
                /* @__PURE__ */ jsx("option", { value: "Dual Clutch", children: "Dual Clutch" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              placeholder: "Cilindraje",
              value: formData.cilindraje,
              onChange: (e) => setFormData({ ...formData, cilindraje: e.target.value }),
              className: "w-full px-3 py-2 border rounded-lg"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              placeholder: "Marchas",
              value: formData.marchas,
              onChange: (e) => setFormData({ ...formData, marchas: e.target.value }),
              className: "w-full px-3 py-2 border rounded-lg"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              placeholder: "Recorrido (km)",
              value: formData.recorrido,
              onChange: (e) => setFormData({ ...formData, recorrido: e.target.value }),
              className: "w-full px-3 py-2 border rounded-lg"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
            "Extras (AC, Sunroof, etc.)"
          ] }) }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              placeholder: "Ej: Aire acondicionado, Sunroof panorámico, Asientos de cuero, Sensores de reversa, Cámara trasera...",
              value: formData.extras,
              onChange: (e) => setFormData({ ...formData, extras: e.target.value }),
              className: "w-full px-3 py-2 border rounded-lg",
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
            "Detalles / Desperfectos"
          ] }) }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              placeholder: "Ej: Raspón en puerta trasera, Pintura retocada en parachoques, Requiere cambio de llanta...",
              value: formData.detalles,
              onChange: (e) => setFormData({ ...formData, detalles: e.target.value }),
              className: "w-full px-3 py-2 border rounded-lg",
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Imágenes del Vehículo" }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              onDragOver: handleDragOver,
              onDragLeave: handleDragLeave,
              onDrop: handleDrop,
              className: "border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition",
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-3xl mb-2", children: "📸" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-2", children: "Arrastra imágenes aquí o haz clic para seleccionar" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    multiple: true,
                    onChange: handleImageChange,
                    className: "hidden",
                    id: "file-input"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "file-input",
                    className: "inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold cursor-pointer transition",
                    children: "Seleccionar archivos"
                  }
                )
              ]
            }
          ),
          imageFiles.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold text-gray-700 mb-2", children: [
              imageFiles.length,
              " imagen(es) seleccionada(s):"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: Array.from(imageFiles).map((file, index) => /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: URL.createObjectURL(file),
                  alt: `Preview ${index + 1}`,
                  className: "w-20 h-20 object-cover rounded border border-gray-300"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeImage(index),
                  className: "absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition",
                  children: "✕"
                }
              ),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-600 mt-1 truncate", children: [
                file.name.substring(0, 15),
                "..."
              ] })
            ] }, index)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: uploading,
              className: "flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50",
              children: uploading ? "Subiendo..." : "Guardar"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowModal(false),
              className: "flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-semibold",
              children: "Cancelar"
            }
          )
        ] })
      ] })
    ] }) }),
    showImageModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-8 max-w-md w-full", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "Agregar Imágenes" }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          onDrop: handleDrop,
          className: "border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition mb-4",
          children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl mb-2", children: "📸" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-2", children: "Arrastra imágenes aquí" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept: "image/*",
                multiple: true,
                onChange: handleImageChange,
                className: "hidden",
                id: "file-input-modal"
              }
            ),
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "file-input-modal",
                className: "inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold cursor-pointer transition",
                children: "Seleccionar archivos"
              }
            )
          ]
        }
      ),
      imageFiles.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold text-gray-700 mb-2", children: [
          imageFiles.length,
          " imagen(es)"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: Array.from(imageFiles).map((file, index) => /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: URL.createObjectURL(file),
              alt: `Preview ${index + 1}`,
              className: "w-20 h-20 object-cover rounded border border-gray-300"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => removeImage(index),
              className: "absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition",
              children: "✕"
            }
          )
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleAddImagesToVehicle,
            disabled: uploading || imageFiles.length === 0,
            className: "flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50",
            children: uploading ? "Subiendo..." : "Agregar Imágenes"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setShowImageModal(false);
              setImageFiles([]);
              setSelectedVehicleId(null);
            },
            className: "flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-semibold",
            children: "Cancelar"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Imagen" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Marca" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Modelo" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Precio" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Descuento" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Estado" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: vehicles.map((vehicle) => /* @__PURE__ */ jsxs("tr", { className: "border-b hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: vehicle.imagenes && vehicle.imagenes.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: vehicle.imagenes[0],
              alt: `${vehicle.marca} ${vehicle.modelo_año}`,
              className: "w-16 h-16 object-cover rounded cursor-pointer hover:shadow-lg transition",
              title: `${vehicle.imagenes.length} imagen(es)`
            }
          ),
          vehicle.imagenes.length > 1 && /* @__PURE__ */ jsxs("div", { className: "w-16 h-16 bg-blue-100 rounded flex items-center justify-center text-blue-600 font-semibold text-sm cursor-pointer hover:shadow-lg transition", children: [
            "+",
            vehicle.imagenes.length - 1
          ] })
        ] }) : /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs", children: "Sin imagen" }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: vehicle.marca }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: vehicle.modelo_año }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: vehicle.descuento_porcentaje && vehicle.descuento_porcentaje > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("span", { className: "text-gray-400 line-through text-sm", children: [
            "QTZ ",
            vehicle.precio_original?.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-green-600 font-bold", children: [
            "QTZ ",
            vehicle.precio.toLocaleString()
          ] })
        ] }) : /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
          "QTZ ",
          vehicle.precio.toLocaleString()
        ] }) }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: vehicle.descuento_porcentaje && vehicle.descuento_porcentaje > 0 ? /* @__PURE__ */ jsxs("span", { className: "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold", children: [
          "-",
          vehicle.descuento_porcentaje,
          "%"
        ] }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-sm", children: "-" }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsxs(
          "select",
          {
            value: vehicle.estado,
            onChange: (e) => handleChangeStatus(vehicle.id, e.target.value),
            className: `px-2 py-1 rounded text-sm font-semibold border-0 cursor-pointer ${vehicle.estado === "disponible" ? "bg-green-100 text-green-800" : vehicle.estado === "vendido" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`,
            children: [
              /* @__PURE__ */ jsx("option", { value: "disponible", children: "disponible" }),
              /* @__PURE__ */ jsx("option", { value: "vendido", children: "vendido" }),
              /* @__PURE__ */ jsx("option", { value: "reservado", children: "reservado" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs("td", { className: "px-4 py-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setSelectedVehicleId(vehicle.id);
                setShowImageModal(true);
                setImageFiles([]);
              },
              className: "text-blue-600 hover:text-blue-800 font-semibold mr-3",
              children: "📸 Imágenes"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleOpenPriceModal(vehicle),
              className: "text-green-600 hover:text-green-800 font-semibold mr-3",
              children: "💵 Precio"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDeleteVehicle(vehicle.id),
              className: "text-red-600 hover:text-red-800 font-semibold",
              children: "Eliminar"
            }
          )
        ] })
      ] }, vehicle.id)) })
    ] }) }),
    vehicles.length === 0 && !loading && /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 mt-4", children: "No hay vehículos en el inventario" }),
    showPriceModal && selectedVehicle && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 max-w-md w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900", children: "Editar Precio" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setShowPriceModal(false);
              setSelectedVehicle(null);
              setError("");
            },
            className: "text-gray-500 hover:text-gray-700",
            children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4 p-3 bg-gray-50 rounded-lg", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Vehículo:" }),
        /* @__PURE__ */ jsxs("p", { className: "font-bold text-gray-900", children: [
          selectedVehicle.marca,
          " ",
          selectedVehicle.modelo_año
        ] })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Precio Base (QTZ)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: priceData.precio,
              onChange: (e) => setPriceData({ ...priceData, precio: e.target.value }),
              className: "w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500",
              placeholder: "Ej: 150000",
              step: "1000",
              min: "0"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Descuento (%)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: priceData.descuento_porcentaje,
              onChange: (e) => setPriceData({ ...priceData, descuento_porcentaje: e.target.value }),
              className: "w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500",
              placeholder: "Ej: 10 (deja vacío si no hay descuento)",
              step: "1",
              min: "0",
              max: "100"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Ingresa 0 o deja vacío para eliminar el descuento" })
        ] }),
        priceData.precio && parseFloat(priceData.precio) > 0 && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-2", children: "Vista previa:" }),
          priceData.descuento_porcentaje && parseFloat(priceData.descuento_porcentaje) > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-gray-500 line-through", children: [
                "QTZ ",
                parseFloat(priceData.precio).toLocaleString()
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs font-bold", children: [
                "-",
                priceData.descuento_porcentaje,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-green-600", children: [
              "QTZ ",
              (parseFloat(priceData.precio) * (1 - parseFloat(priceData.descuento_porcentaje) / 100)).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
              "Ahorro: QTZ ",
              (parseFloat(priceData.precio) * (parseFloat(priceData.descuento_porcentaje) / 100)).toLocaleString()
            ] })
          ] }) : /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-gray-900", children: [
            "QTZ ",
            parseFloat(priceData.precio).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleUpdatePrice,
              className: "flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold",
              children: "Guardar Cambios"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setShowPriceModal(false);
                setSelectedVehicle(null);
                setError("");
              },
              className: "px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-gray-700",
              children: "Cancelar"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
};

const $$Vehicles = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Inventario de Veh\xEDculos - iCarSolutions" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-12 px-4"> <div class="max-w-7xl mx-auto"> <div class="flex justify-between items-center mb-6"> <a href="/dashboard" class="text-blue-600 hover:text-blue-800 font-semibold">
← Volver al Dashboard
</a> ${renderComponent($$result2, "LogoutButton", LogoutButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/LogoutButton", "client:component-export": "default" })} </div> ${renderComponent($$result2, "VehicleInventory", VehicleInventory, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/VehicleInventory", "client:component-export": "default" })} </div> </div> ` })} ${renderScript($$result, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/vehicles.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/vehicles.astro", void 0);

const $$file = "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/vehicles.astro";
const $$url = "/vehicles";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Vehicles,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
