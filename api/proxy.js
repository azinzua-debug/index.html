export default async function handler(req, res) {
  const baseUrl = "http://216.173.77.190:25791";

  try {
    // Detectar si el proxy pide "profiles", "portafolio" o ambos
    const isPortafolio = req.url.includes("/portafolio");
    const isProfiles = req.url.includes("/profiles");

    let data = null;

    if (isProfiles) {
      const profilesRes = await fetch(`${baseUrl}/profiles`);
      data = await profilesRes.json();
    } else if (isPortafolio) {
      const portafolioRes = await fetch(`${baseUrl}/portafolio`);
      data = await portafolioRes.json();
    } else {
      // Si no especifica, combinar ambos
      const [profilesRes, portafolioRes] = await Promise.all([
        fetch(`${baseUrl}/profiles`),
        fetch(`${baseUrl}/portafolio`)
      ]);

      const perfiles = await profilesRes.json();
      const portafolio = await portafolioRes.json();
      data = { perfiles, portafolio };
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error al conectar con el servidor base:", err);
    res.status(500).json({ error: "No se pudo conectar al servidor base" });
  }
}
