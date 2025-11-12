export default async function handler(req, res) {
  try {
    // Fetch de los perfiles
    const perfilesRes = await fetch("http://216.173.77.190:25791/profiles");
    const perfiles = await perfilesRes.json();

    // Fetch del portafolio
    const portafolioRes = await fetch("http://216.173.77.190:25791/portafolio");
    const portafolio = await portafolioRes.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ perfiles, portafolio });
  } catch (err) {
    console.error("❌ Error al conectar con el servidor base:", err);
    res.status(500).json({ error: "No se pudo conectar al servidor base" });
  }
}
