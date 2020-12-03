const express = require("express");
const multer = require("multer");
const upload = multer();

const app = express();

app.post("/license-card", upload.single("license"), async (req, res, next) => {
  // Creates a client
  const vision = require("@google-cloud/vision");
  const client = new vision.ImageAnnotatorClient();

  // Creates a client

  // Performs label detection on the image file
  try {
    //get the text in the photo
    const [result] = await client.textDetection(req.file.buffer);
    console.log(result, "result");
    res.send(result.textAnnotations);
  } catch (e) {
    console.log(e);
    next();
  }

  res.send();
});

const result = require("./response1");
const result2 = require("./response2");
const result3 = require("./response3");
const result4 = require("./response4");

[
  result[0].description,
  result2[0].description,
  result3[0].description,
  result4[0].description,
].forEach((description) => {
  console.time("run");
  const words = description.split("\n");
  console.log(words);
  if (!isLicense(words)) {
    //Arrojar un error aqui
    console.log("");
  }

  console.timeEnd("run");
});

function isLicense(textDetections) {
  const words = [
    "MINISTERIO DE TRANSPORTE",
    "PLACA",
    "MARCA",
    "MODELO",
    "CLASE DE VEHICULO",
    "COMBUSTIBLE",
    "COLOR",
    "SERVICIO",
    "REG",
  ];

  const occurrences = words.filter((word) =>
    textDetections.findIndex((detection) => detection === word)
  );

  return occurrences.length / words.length > 0.7;
}

module.exports = app;
