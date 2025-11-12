export default async function handler(req, res) {
  try {
    const perfilesRes = await fetch("http://216.173.77.190:25791/profiles");
    const portafolioRes = await fetch("http://216.173.77.190:25791/portafolio");

    if (!perfilesRes.ok || !portafolioRes.ok) {
      throw new Error("Error al conectar con los servidores base");
    }

    const perfiles = await perfilesRes.json();
    const portafolio = await portafolioRes.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({
      perfiles,
      portafolio
    });
  } catch (err) {
    console.error("❌ Error en proxy.js:", err);
    res.status(500).json({ error: "No se pudo conectar al servidor base" });
  }
}
