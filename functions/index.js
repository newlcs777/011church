const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");

admin.initializeApp();
const db = admin.firestore();

/* ======================================================
   🔹 FUNÇÃO EXISTENTE — GEOCODE (NÃO MEXE)
====================================================== */

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

/* ======================================================
   🔹 NOVA FUNÇÃO — EMAIL PARA LÍDER DO DNA
====================================================== */

// SMTP Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass,
  },
});

exports.onDnaInscricaoCreated = functions.firestore
  .document("dna_inscricoes/{inscricaoId}")
  .onCreate(async (snap) => {
    const inscricao = snap.data();

    if (!inscricao?.dnaId) return null;

    // Buscar DNA
    const dnaSnap = await db
      .collection("dna")
      .doc(inscricao.dnaId)
      .get();

    if (!dnaSnap.exists) return null;

    const dna = dnaSnap.data();

    if (!dna?.liderEmail) return null;

    const mailOptions = {
      from: `"Igreja - DNA" <${functions.config().email.user}>`,
      to: dna.liderEmail,
      subject: "Boa notícia! Novo membro no seu DNA",
      html: `
        <p>Olá, <strong>${dna.liderNome || "Líder"}</strong>,</p>
        <p>Temos uma boa notícia 😊</p>
        <p>Um novo membro solicitou entrada no seu DNA.</p>
        <p>
          <strong>DNA:</strong> ${dna.nome}<br/>
          <strong>Dia:</strong> ${dna.dia} • <strong>Horário:</strong> ${dna.horario}
        </p>
        <p>Acesse o app para ver os detalhes.</p>
        <p>Que Deus abençoe esse cuidado 🙏</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return null;
  });
