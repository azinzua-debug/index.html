export default async function handler(req, res) {
  const { url } = req;

  // Determinar si se está solicitando perfiles o portafolio
  let targetUrl = "";

  if (url.includes("/portafolio")) {
    targetUrl = "http://216.173.77.190:25791/portafolio";
  } else {
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
