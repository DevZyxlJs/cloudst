"use strict";

const axios = require("axios");

async function wiki(query) {
  if (!query) throw new Error("Por favor, ingresa lo que quieres buscar en Wikipedia.");

  const searchUrl = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json`;
  const searchRes = await axios.get(searchUrl, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  const results = searchRes.data.query.search;
  if (!results || results.length < 1) {
    throw new Error("No se encontraron resultados en Wikipedia.");
  }

  const count = Math.floor(Math.random() * 3) + 3;
  const shuffled = results.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  return selected.map(r => ({
    title: r.title,
    snippet: r.snippet.replace(/<\/?span[^>]*>/g, "")
  }));
}

module.exports = { wiki };