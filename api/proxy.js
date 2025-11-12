export default async function handler(req, res) {
  try {
    const [perfilesRes, portafolioRes] = await Promise.all([
      fetch("http://216.173.77.190:25791/profiles"),
      fetch("http://216.173.77.190:25791/portafolio")
    ]);

    if (!perfilesRes.ok) throw new Error(`Error perfiles: ${perfilesRes.status}`);
    if (!portafolioRes.ok) throw new Error(`Error portafolio: ${portafolioRes.status}`);

    const perfiles = await perfilesRes.json();
    const portafolio = await portafolioRes.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ perfiles, portafolio });
  } catch (err) {
    console.error("❌ Proxy error:", err.message);
    res.status(500).json({ error: err.message });
  }
}
