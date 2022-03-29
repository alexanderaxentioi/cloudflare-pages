import axios from "axios";

export default async (req, res) => {
  const filter = req.query.q ? new RegExp(req.query.q, "i") : /.*/;
  const pokemon = await axios.get("https://alexanderaxentioi.github.io/pokemon-api/data/pokemon.json").then(({ data }) => data.filter(({ name: { english } }) => filter.test(english)));
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify(
      pokemon.splice(0, req.query.limit ? parseInt(req.query.limit) : 10)
    )
  );
};
