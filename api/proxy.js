export default async function handler(req, res) {
  try {
    // Llamar a ambos endpoints del servidor base
    const [profilesRes, portafolioRes] = await Promise.all([
      fetch("http://216.173.77.190:25791/profiles"),
      fetch("http://216.173.77.190:25791/portafolio")
    ]);

    // Verificar que ambos respondan correctamente
    if (!profilesRes.ok || !portafolioRes.ok) {
      throw new Error("Error en una o ambas respuestas del servidor base");
    }

    const profilesData = await profilesRes.json();
    const portafolioData = await portafolioRes.json();

    // Permitir acceso desde cualquier origen
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Combinar ambos en un solo objeto
    res.status(200).json({
      perfiles: profilesData,
      portafolio: portafolioData
    });

  } catch (err) {
    console.error("❌ Error en el proxy combinado:", err);
    res.status(500).json({ error: "No se pudo conectar al servidor base" });
  }
}
