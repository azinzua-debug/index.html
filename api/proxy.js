export default async function handler(req, res) {
  const baseUrl = "http://216.173.77.190:25791";

  try {
    const [profilesRes, portafolioRes] = await Promise.all([
      fetch(`${baseUrl}/profiles`),
      fetch(`${baseUrl}/portafolio`),
    ]);

    if (!profilesRes.ok || !portafolioRes.ok) {
      throw new Error("Error al obtener datos del servidor base");
    }

    const perfiles = await profilesRes.json();
    const portafolio = await portafolioRes.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ perfiles, portafolio });
  } catch (err) {
    console.error("❌ Error al combinar datos:", err);
    res.status(500).json({ error: "Error al combinar datos del servidor base" });
  }
}
