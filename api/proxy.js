export default async function handler(req, res) {
  try {
    const { tipo } = req.query; // tipo = 'profiles' o 'portafolio'
    let url;

    if (tipo === "profiles") {
      url = "http://216.173.77.190:25791/profiles";
    } else if (tipo === "portafolio") {
      url = "http://216.173.77.190:25791/portafolio";
    } else {
      return res.status(400).json({ error: "Tipo no especificado" });
    }

    const response = await fetch(url);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo conectar al servidor base" });
  }
}
