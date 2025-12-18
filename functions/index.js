const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.geocode = functions.https.onRequest(async (req, res) => {
  const q = req.query.q;

  if (!q) {
    res.status(400).json(null);
    return;
  }

  try {
    const url =
      "https://nominatim.openstreetmap.org/search?" +
      new URLSearchParams({
        q,
        format: "json",
        limit: 1,
      });

    const response = await fetch(url, {
      headers: {
        "User-Agent": "011-church-app",
      },
    });

    if (!response.ok) {
      res.status(500).json(null);
      return;
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      res.json(null);
      return;
    }

    res.json({
      lat: Number(data[0].lat),
      lng: Number(data[0].lon),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(null);
  }
});
