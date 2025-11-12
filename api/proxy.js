export default async function handler(req, res) {
  const { url } = req;

  // Detectar si es un perfil, un portafolio o ambos con parámetros
  let targetUrl = "";

  if (url.startsWith("/api/proxy/portafolio")) {
    // Ejemplo: /api/proxy/portafolio/fuegito
    const path = url.replace("/api/proxy", "");
    targetUrl = `http://216.173.77.190:25791${path}`;
  } else if (url.startsWith("/api/proxy/profiles")) {
    // Ejemplo: /api/proxy/profiles/fuegito
    const path = url.replace("/api/proxy", "");
    targetUrl = `http://216.173.77.190:25791${path}`;
  } else {
    // Por defecto carga la lista general
    targetUrl = "http://216.173.77.190:25791/profiles";
  }

  try {
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error al conectar con el servidor base:", err);
    res.status(500).json({ error: "No se pudo conectar al servidor base" });
  }
}
