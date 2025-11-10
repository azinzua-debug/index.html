export default async function handler(req, res) {
  try {
    const response = await fetch("http://216.173.77.190:25791/profiles");
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "No se pudo conectar al servidor base" });
  }
}
