export default async function handler(req, res) {
  const data = [
    { nombre: "fuegito", descripcion: "hola", redes: "ig", rol: "ambos" }
  ];
  res.status(200).json(data);
}
