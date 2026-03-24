"use strict";

const axios = require("axios");

/**
 * Scraper de Wikipedia
 * @param {Object} req - Request con query { query }
 * @param {Object} res - Response para devolver JSON
 */
async function wiki(req, res) {
  const { query } = req.query;
  let q = query;
  if (!q) {
    return res.status(200).json({
      success: false,
      error: "Por favor, ingresa lo que quieres buscar en Wikipedia."
    });
  }

  try {
    const searchUrl = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json`;
    const searchRes = await axios.get(searchUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const results = searchRes.data.query.search;
    if (!results || results.length < 4) {
      return res.status(404).json({
        success: false,
        error: "No hay suficientes resultados en Wikipedia (mínimo 4)."
      });
    }

    const count = Math.floor(Math.random() * 3) + 3;
    const shuffled = results.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    const formatted = selected.map(r => ({
      title: r.title,
      snippet: r.snippet.replace(/<\/?span[^>]*>/g, "")
    }));

    return res.json({
      status: true,
      data: { results: formatted }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Error consultando Wikipedia"
    });
  }
}

module.exports = { wiki };