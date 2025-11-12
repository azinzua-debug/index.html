export default async function handler(req, res) {
  try {
    const { tipo, id } = req.query;

    // Determina el endpoint según el tipo
    let baseUrl;
    if (tipo === "perfiles") {
      baseUrl = "http://216.173.77.190:25791/profiles";
    } else if (tipo === "portafolio") {
      baseUrl = "http://216.173.77.190:25791/portafolio";
    } else {
      return res.status(400).json({ error: "Tipo de solicitud inválido. Usa 'perfiles' o 'portafolio'." });
    }

    // Si hay ID, lo agregamos al final
    const url = id ? `${baseUrl}?id=${id}` : baseUrl;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al conectar con ${url}`);
    }

    const data = await response.json();

    // CORS + respuesta
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error en proxy.js:", err);
    res.status(500).json({ error: "No se pudo conectar al servidor base", detalle: err.message });
  }
}
